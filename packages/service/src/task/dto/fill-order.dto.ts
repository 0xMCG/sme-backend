import { ApiProperty } from "@nestjs/swagger";
import { MatchOrdersFulfillment } from "@opensea/seaport-js/lib/types";
import { OrderEntry } from "../../order/types";

export class FillOrderDto {

    @ApiProperty({
        type: Number,
    })
    randomNumberCount: number;

    @ApiProperty({
        type: Number,
    })
    randomStrategy: number;

    @ApiProperty({
        type: [OrderEntry],
    })
    takerOrders: OrderEntry[];

    @ApiProperty({
        type: [OrderEntry],
    })
    makerOrders: OrderEntry[];

    @ApiProperty({
        // type: [{
        //     offerComponents: [{
        //         orderIndex: Number,
        //         itemIndex: Number,
        //     }],
        //     considerationComponents: [{
        //         orderIndex: Number,
        //         itemIndex: Number,
        //     }]
        // }],
    })
    modeOrderFulfillments: MatchOrdersFulfillment[];
}