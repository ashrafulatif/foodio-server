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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const jwt_auth_guard_1 = require("../../common/auth/guards/jwt-auth.guard");
const sendResponse_1 = require("../../common/shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const roles_guard_1 = require("../../common/auth/guards/roles.guard");
const roles_decorator_1 = require("../../common/auth/decorators/roles.decorator");
const enums_1 = require("../../../generated/prisma/enums");
let OrdersController = class OrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async createOrder(payload, req) {
        const result = await this.ordersService.createOrder(payload, req.user.userId);
        return (0, sendResponse_1.sendResponse)({
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'Order created successfully',
            data: result,
        });
    }
    async findAllOrder(query) {
        const result = await this.ordersService.findAllOrder(query);
        return (0, sendResponse_1.sendResponse)({
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Orders retrieved successfully',
            data: result.data,
            meta: result.meta,
        });
    }
    async findAllCustomerOrder(req) {
        const result = await this.ordersService.findAllCustomerOrder(req.user.userId);
        return (0, sendResponse_1.sendResponse)({
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Orders retrieved successfully',
            data: result,
        });
    }
    async findOrderById(id) {
        const result = await this.ordersService.findOrderById(id);
        return (0, sendResponse_1.sendResponse)({
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order retrieved successfully',
            data: result,
        });
    }
    async updateOrderStatus(id, updateOrderDto) {
        const result = await this.ordersService.updateOrderStatus(id, updateOrderDto);
        return (0, sendResponse_1.sendResponse)({
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order status updated successfully',
            data: result,
        });
    }
    async removeOrder(id) {
        const result = await this.ordersService.removeOrder(id);
        return (0, sendResponse_1.sendResponse)({
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order removed successfully',
            data: result,
        });
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CUSTOMER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAllOrder", null);
__decorate([
    (0, common_1.Get)('my-orders'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CUSTOMER),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAllCustomerOrder", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOrderById", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, common_1.Patch)('status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "removeOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map