import { PaymentMethod } from 'generated/prisma/enums';
declare class CreateOrderItemDto {
    menuItemId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    paymentMethod: PaymentMethod;
    address?: string;
    items: CreateOrderItemDto[];
}
export {};
