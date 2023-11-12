import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateOrderDto} from './dto/create-order.dto';
import {InjectModel} from '@nestjs/mongoose';
import {SeaportProvider} from '../lib/seaport.provider';
import {
  Consideration,
  Offer,
  OrderDistribution,
  OrderEntry,
  OrderPrice,
  OrderQueryParams,
  OrderStatus,
  OrderType,
  PriceExpectation
} from './types';
import * as _ from 'lodash';
import BigNumber from 'bignumber.js'
import {ItemType} from "@opensea/seaport-js/lib/constants";
import {ethers} from 'ethers';
import * as formulajs from '@formulajs/formulajs'

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel,
    @InjectModel('Transaction') private readonly transactionModel,
    private readonly seaportProvider: SeaportProvider,

  ) { }

  async orderDistribution(precision: number, pointSize: number): Promise<OrderDistribution> {
    // 查询最后一笔订单价格
    const lastTransaction = await this.transactionModel.findOne({ status: OrderStatus.MATCHED }).sort({_id: -1}).exec();
    let result = new OrderDistribution();
    if (!_.isEmpty(lastTransaction)) {
      const margin = new BigNumber(pointSize).multipliedBy(precision);
      const avgPrice = new BigNumber(lastTransaction.price).toNumber();
      const maxPrice = new BigNumber(avgPrice).plus(margin).toNumber();
      const minPrice = new BigNumber(avgPrice).minus(margin).toNumber();
      const current_timestamp = new Date().getTime() / 1000;
      const conditionQuery = {
        'entry.parameters.endTime': {
          $gte: current_timestamp.toString(),
        },
        status: {
          $nin: [OrderStatus.CANCELLED, OrderStatus.MATCHED],
        },
      };
      const validOrders = await this.orderModel.find(conditionQuery).exec();
      if (_.isEmpty(validOrders)) {
        return result;
      }
      const allOrderPrices: OrderPrice[] = this.parseOrderPrice(_.map(validOrders, i => i.entry), maxPrice, minPrice);
      result = this.calculateOrderDistribution(allOrderPrices, maxPrice, minPrice, precision);
    } else {
      console.log("no transactions...")
    }
    return result;
  }

  calculateOrderDistribution(orderPrices: OrderPrice[], maxPrice: number, minPrice: number, precision: number): OrderDistribution {
    // 买单
    const bidOrders = _.filter(orderPrices, i => i.orderType !== OrderType.SELL)
    // 卖单
    const sellOrders = _.filter(orderPrices, i => i.orderType === OrderType.SELL)

    const priceList: number[] = [];

    let itemPrice = minPrice;
    while (itemPrice <= maxPrice) {
      priceList.push(itemPrice);
      itemPrice = new BigNumber(itemPrice).plus(precision).toNumber();
    }

    return {
      maxPrice,
      minPrice,
      precision,
      bidExpectationList: this.calculateExpectations(priceList, bidOrders, precision),
      listExpectationList: this.calculateExpectations(priceList, sellOrders, precision)
    }
  }

  calculateExpectations(priceList: number[], orderPrices: OrderPrice[], precision: number): PriceExpectation[] {
    const expectationList: PriceExpectation[] = _.map(priceList, i => {
      let expectation = new BigNumber(0);
      _.forEach(orderPrices, j => {
        if (j.max > i && j.min < i) {
          const alpha = j.orderType === OrderType.INITIAL ? 2 : 3;
          const beta = 3;
          const dist1 = formulajs.BETADIST(i, alpha, beta, true,  j.min, j.max);
          const dist2 = formulajs.BETADIST(new BigNumber(i).plus(precision).toNumber(), alpha, beta, true,  j.min, j.max);
          expectation = new BigNumber(expectation).plus(dist2).minus(dist1).multipliedBy(j.quantity);
        }
      })
      return {
        price: i,
        expectation: expectation.toNumber()
      }
    });
    return expectationList;
  }

  parseOrderPrice(orders: any, maxPrice: number, minPrice: number): OrderPrice[] {
    const result: OrderPrice[] = _(orders).filter((i: OrderEntry) => {
      const orderType = i.parameters.orderType;
      if ((i.parameters.offer[0].itemType === ItemType.ERC1155 && orderType === OrderType.SELL)
          || (i.parameters.consideration[0].itemType === ItemType.ERC1155 && (orderType === OrderType.BID || orderType === OrderType.INITIAL))) {
        const itemData: Consideration | Offer = orderType === OrderType.SELL ? i.parameters.offer[0] : i.parameters.consideration[0];
        const priceData: Consideration | Offer = orderType === OrderType.SELL ? i.parameters.consideration[0] : i.parameters.offer[0];
        const quantity = itemData.startAmount;
        const startAmount = priceData.startAmount;
        const endAmount = priceData.endAmount;
        const itemStartAmount = new BigNumber(ethers.utils.formatEther(ethers.BigNumber.from(startAmount))).dividedBy(quantity);
        const itemEndAmount = new BigNumber(ethers.utils.formatEther(ethers.BigNumber.from(endAmount))).dividedBy(quantity);
        if (itemStartAmount.comparedTo(maxPrice) < 0 && itemEndAmount.comparedTo(minPrice) > 0) {
          return true
        }
      }
      return false;
    }).map((i: OrderEntry) => {
      const orderType = i.parameters.orderType;
      const itemData: Consideration | Offer = orderType === OrderType.SELL ? i.parameters.offer[0] : i.parameters.consideration[0];
      const priceData: Consideration | Offer = orderType === OrderType.SELL ? i.parameters.consideration[0] : i.parameters.offer[0];
      const quantity = new BigNumber(itemData.startAmount).toNumber();
      const startAmount = priceData.startAmount;
      const endAmount = priceData.endAmount;
      const min = new BigNumber(ethers.utils.formatEther(ethers.BigNumber.from(startAmount))).dividedBy(quantity).toNumber();
      const max = new BigNumber(ethers.utils.formatEther(ethers.BigNumber.from(endAmount))).dividedBy(quantity).toNumber();
      const result: OrderPrice = {
        max,
        min,
        quantity,
        orderType
      }
      return result;
    }).value();
    return result;
  }

  async create(createOrderDto: CreateOrderDto) {
    // const hash = this.seaportProvider.getProvider().getOrderHash(createOrderDto.entry.parameters as OrderComponents);
    // createOrderDto.hash = hash;

    // orderer & consideration check
    if (
      createOrderDto.entry.parameters.offer.length == 0 &&
      createOrderDto.entry.parameters.consideration.length == 0
    ) {
      throw new HttpException(
        'offer and consideration cannot be empty at the same time',
        HttpStatus.BAD_REQUEST,
      );
    }

    // hash check
    const ifExist = await this.orderModel
      .find({ hash: createOrderDto.hash })
      .limit(1)
      .exec();
    if (ifExist.length != 0)
      throw new HttpException('Order already exist', HttpStatus.BAD_REQUEST);
    const model = new this.orderModel(createOrderDto);
    return await model.save();
  }

  async findAll(query: OrderQueryParams) {
    const current_timestamp = new Date().getTime() / 1000;
    const conditionQuery = {
      'entry.parameters.endTime': {
        $gte: current_timestamp.toString(),
      },
      status: {
        $nin: [OrderStatus.CANCELLED, OrderStatus.MATCHED],
      },
    };

    if (query.type) {
      conditionQuery['type'] = query.type;
    } else {
      conditionQuery['type'] = { $ne: OrderType.INITIAL }
    }

    if (query.offerer) {
      conditionQuery['entry.parameters.offerer'] = query.offerer;
    }

    return await this.orderModel
      .find(conditionQuery)
      .exec();
  }

  async findRemainingNft() {
    const current_timestamp = new Date().getTime() / 1000;
    const conditionQuery = {
      'entry.parameters.endTime': {
        $gte: current_timestamp.toString(),
      },
      status: {
        $nin: [OrderStatus.CANCELLED, OrderStatus.MATCHED, OrderStatus.PENDING],
      },
      type: OrderType.INITIAL
    };

    const result = await this.orderModel
    .find(conditionQuery)
    .exec();

    return result?.length;
  }

  async  findInitialMarkerOrder() {
    const current_timestamp = new Date().getTime() / 1000;
    const conditionQuery = {
      'entry.parameters.endTime': {
        $gte: current_timestamp.toString(),
      },
      status: {
        $nin: [OrderStatus.CANCELLED, OrderStatus.MATCHED, OrderStatus.PENDING],
      },
      type: OrderType.INITIAL
    };

    const result = await this.orderModel
    .findOne(conditionQuery)
    .exec();

    return result;
  }

  async findOne(hash: string) {
    return await this.orderModel.findOne({ hash: hash }).limit(1).exec();
  }

  async deleteOne(hash: string) {
    return this.orderModel.deleteOne({ hash: hash }).exec();
  }

  async updateOrderStatus(hash: string, status: string) {
    return this.orderModel
      .updateOne(
        { hash },
        {
          $set: { status },
        },
      )
      .exec();
  }

  async findInvalidOrder(offerer: string, token: string, threshold: number) {
    return await this.orderModel.aggregate([
      {
        $addFields: {
          'entry.parameters.offer': {
            $map: {
              input: "$entry.parameters.offer",
              as: "item",
              in: {
                token: "$$item.token",
                startAmount: { $toDouble: "$$item.startAmount" } // 将属性b转换为数字
              }
            }
          }
        }
      },
      {
        $match: {
          'entry.parameters.offerer': offerer,
          'entry.parameters.offer.token': token,
          'entry.parameters.offer.startAmount': { $gt: threshold },
          'status': { $ne: OrderStatus.MATCHED }
        }
      }
    ])
  }
}
