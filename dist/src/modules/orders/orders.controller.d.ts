import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserRole } from 'generated/prisma/enums';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(payload: CreateOrderDto, req: any): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: ({
            user: {
                id: string;
                name: string;
                email: string;
                role: UserRole;
            };
            items: ({
                menuItem: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    price: number;
                    imageUrl: string | null;
                    available: boolean;
                    categoryId: string;
                };
            } & {
                id: string;
                price: number;
                orderId: string;
                menuItemId: string;
                quantity: number;
            })[];
        } & {
            id: string;
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import("generated/prisma/enums").OrderStatus;
            total: number;
            paymentMethod: import("generated/prisma/enums").PaymentMethod;
        }) | null | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    findAllOrder(query: any): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: ({
            user: {
                id: string;
                name: string;
                email: string;
                role: UserRole;
            };
            items: ({
                menuItem: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    price: number;
                    imageUrl: string | null;
                    available: boolean;
                    categoryId: string;
                };
            } & {
                id: string;
                price: number;
                orderId: string;
                menuItemId: string;
                quantity: number;
            })[];
        } & {
            id: string;
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import("generated/prisma/enums").OrderStatus;
            total: number;
            paymentMethod: import("generated/prisma/enums").PaymentMethod;
        })[] | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    findAllCustomerOrder(req: any): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: ({
            user: {
                id: string;
                name: string;
                email: string;
                role: UserRole;
            };
            items: ({
                menuItem: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    price: number;
                    imageUrl: string | null;
                    available: boolean;
                    categoryId: string;
                };
            } & {
                id: string;
                price: number;
                orderId: string;
                menuItemId: string;
                quantity: number;
            })[];
        } & {
            id: string;
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import("generated/prisma/enums").OrderStatus;
            total: number;
            paymentMethod: import("generated/prisma/enums").PaymentMethod;
        })[] | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    findOrderById(id: string): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: ({
            user: {
                id: string;
                name: string;
                email: string;
                role: UserRole;
            };
            items: ({
                menuItem: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    price: number;
                    imageUrl: string | null;
                    available: boolean;
                    categoryId: string;
                };
            } & {
                id: string;
                price: number;
                orderId: string;
                menuItemId: string;
                quantity: number;
            })[];
        } & {
            id: string;
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import("generated/prisma/enums").OrderStatus;
            total: number;
            paymentMethod: import("generated/prisma/enums").PaymentMethod;
        }) | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    updateOrderStatus(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: ({
            items: {
                id: string;
                price: number;
                orderId: string;
                menuItemId: string;
                quantity: number;
            }[];
        } & {
            id: string;
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import("generated/prisma/enums").OrderStatus;
            total: number;
            paymentMethod: import("generated/prisma/enums").PaymentMethod;
        }) | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
    removeOrder(id: string): Promise<{
        statusCode: number;
        success: boolean;
        message: string;
        data: {
            id: string;
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import("generated/prisma/enums").OrderStatus;
            total: number;
            paymentMethod: import("generated/prisma/enums").PaymentMethod;
        } | undefined;
        meta: import("../../common/shared/interface/response.interface").Meta | undefined;
    }>;
}
