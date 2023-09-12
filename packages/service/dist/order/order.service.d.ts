import { CreateOrderDto } from './dto/create-order.dto';
import { SeaportProvider } from '../lib/seaport.provider';
export declare class OrderService {
    private readonly orderModel;
    private readonly seaportProvider;
    constructor(orderModel: any, seaportProvider: SeaportProvider);
    create(createOrderDto: CreateOrderDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(hash: string): Promise<any>;
    deleteOne(hash: string): Promise<any>;
    updateOrderStatus(hash: string, status: string): Promise<any>;
}
