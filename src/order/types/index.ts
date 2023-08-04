import { ApiProperty } from "@nestjs/swagger";

class Offer {
    @ApiProperty()
    itemType: number;
    @ApiProperty()
    token: string;
    @ApiProperty()
    identifierOrCriteria: string;
    @ApiProperty()
    startAmount: string;
    @ApiProperty()
    endAmount: string;
}

class Consideration {
    @ApiProperty()
    itemType: number;
    @ApiProperty()
    token: string;
    @ApiProperty()
    identifierOrCriteria: string;
    @ApiProperty()
    startAmount: string;
    @ApiProperty()
    endAmount: string;
    @ApiProperty()
    recipient: string;
}

class OrderParameter {
    @ApiProperty()
    offerer: string;
    @ApiProperty()
    zone: string;
    @ApiProperty()
    zoneHash: string;
    @ApiProperty()
    startTime: string;
    @ApiProperty()
    endTime: string;
    @ApiProperty()
    orderType: number;
    @ApiProperty({
        type: [Offer]
    })
    offer: [Offer];
    @ApiProperty({
        type: [Consideration]
    })
    consideration: [Consideration];
    @ApiProperty()
    totalOriginalConsiderationItems: number;
    @ApiProperty()
    salt: string;
    @ApiProperty()
    conduitKey: string;
    @ApiProperty()
    counter: string;
}

class OrderEntry {
    @ApiProperty({
        type: OrderParameter
    })
    parameters: OrderParameter;
    @ApiProperty()
    signature: string
}

export {
    Offer,
    Consideration,
    OrderEntry
}