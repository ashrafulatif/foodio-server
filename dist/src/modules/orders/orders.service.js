"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginationAndSorting_1 = __importDefault(require("../../common/utils/paginationAndSorting"));
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(payload, userId) {
        const menuItemIds = payload.items.map((item) => item.menuItemId);
        const menuItems = await this.prisma.menuItem.findMany({
            where: {
                id: {
                    in: menuItemIds,
                },
                available: true,
            },
        });
        if (menuItems.length !== payload.items.length) {
            throw new common_1.NotFoundException('One or more menu items are invalid or unavailable');
        }
        const orderItemsData = payload.items.map((item) => {
            const menuItem = menuItems.find((m) => m.id === item.menuItemId);
            return {
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                price: menuItem.price * item.quantity,
            };
        });
        const total = orderItemsData.reduce((sum, item) => sum + item.price, 0);
        const order = await this.prisma.$transaction(async (tx) => {
            const createdOrder = await tx.order.create({
                data: {
                    userId,
                    paymentMethod: payload.paymentMethod,
                    address: payload.address,
                    total,
                },
            });
            await tx.orderItem.createMany({
                data: orderItemsData.map((item) => ({
                    ...item,
                    orderId: createdOrder.id,
                })),
            });
            return createdOrder;
        });
        const fullOrder = await this.prisma.order.findUnique({
            where: { id: order.id },
            include: {
                user: {
                    select: { id: true, name: true, email: true, role: true },
                },
                items: {
                    include: { menuItem: true },
                },
            },
        });
        return fullOrder;
    }
    async findAllOrder(query) {
        const { page, limit, skip } = (0, paginationAndSorting_1.default)(query);
        const orders = await this.prisma.order.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    },
                },
                items: {
                    include: {
                        menuItem: true,
                    },
                },
            },
        });
        const total = await this.prisma.order.count();
        return {
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            data: orders,
        };
    }
    async findAllCustomerOrder(userId) {
        return this.prisma.order.findMany({
            where: {
                userId,
            },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: { id: true, name: true, email: true, role: true },
                },
                items: {
                    include: {
                        menuItem: true,
                    },
                },
            },
        });
    }
    async findOrderById(id) {
        const order = await this.prisma.order.findUnique({
            where: {
                id,
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true, role: true },
                },
                items: {
                    include: {
                        menuItem: true,
                    },
                },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async updateOrderStatus(id, updateOrderDto) {
        const status = updateOrderDto.status;
        if (!status) {
            throw new common_1.BadRequestException('status is required');
        }
        return await this.prisma.order.update({
            where: {
                id,
            },
            data: {
                status,
            },
            include: {
                items: true,
            },
        });
    }
    async removeOrder(id) {
        return await this.prisma.order.delete({
            where: {
                id,
            },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map