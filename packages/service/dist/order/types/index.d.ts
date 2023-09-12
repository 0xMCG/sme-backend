declare class Offer {
    itemType: number;
    token: string;
    identifierOrCriteria: string;
    startAmount: string;
    endAmount: string;
}
declare class Consideration {
    itemType: number;
    token: string;
    identifierOrCriteria: string;
    startAmount: string;
    endAmount: string;
    recipient: string;
}
declare class OrderParameter {
    offerer: string;
    zone: string;
    zoneHash: string;
    startTime: string;
    endTime: string;
    orderType: number;
    offer: Array<Offer>;
    consideration: Array<Consideration>;
    totalOriginalConsiderationItems: number;
    salt: string;
    conduitKey: string;
    counter: string;
}
declare class OrderEntry {
    parameters: OrderParameter;
    signature: string;
}
export { Offer, Consideration, OrderEntry };
export declare enum OrderStatus {
    CANCELLED = "Cancelled",
    MATCHED = "Matched",
    VALID = "Valid"
}
