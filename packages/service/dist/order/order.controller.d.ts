import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(hash: string): Promise<any>;
    delete(hash: string): Promise<any>;
}
