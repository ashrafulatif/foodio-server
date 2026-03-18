import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from 'generated/prisma/enums';
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrder(payload: CreateOrderDto, userId: string): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
            role: import("generated/prisma/enums").UserRole;
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
        status: OrderStatus;
        total: number;
        paymentMethod: import("generated/prisma/enums").PaymentMethod;
    }) | null>;
    findAllOrder(query: any): Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
        data: ({
            user: {
                id: string;
                name: string;
                email: string;
                role: import("generated/prisma/enums").UserRole;
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
            status: OrderStatus;
            total: number;
            paymentMethod: import("generated/prisma/enums").PaymentMethod;
        })[];
    }>;
    findAllCustomerOrder(userId: string): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
            role: import("generated/prisma/enums").UserRole;
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
        status: OrderStatus;
        total: number;
        paymentMethod: import("generated/prisma/enums").PaymentMethod;
    })[]>;
    findOrderById(id: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: import("generated/prisma/enums").UserRole;
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
        status: OrderStatus;
        total: number;
        paymentMethod: import("generated/prisma/enums").PaymentMethod;
    }>;
    updateOrderStatus(id: string, updateOrderDto: UpdateOrderDto): Promise<{
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
        status: OrderStatus;
        total: number;
        paymentMethod: import("generated/prisma/enums").PaymentMethod;
    }>;
    removeOrder(id: string): Promise<{
        id: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: OrderStatus;
        total: number;
        paymentMethod: import("generated/prisma/enums").PaymentMethod;
    }>;
}
