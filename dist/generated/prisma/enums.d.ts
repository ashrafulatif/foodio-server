export declare const UserRole: {
    readonly CUSTOMER: "CUSTOMER";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly PREPARING: "PREPARING";
    readonly READY: "READY";
    readonly COMPLETED: "COMPLETED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const PaymentMethod: {
    readonly CASH: "CASH";
    readonly CARD: "CARD";
    readonly ONLINE: "ONLINE";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
