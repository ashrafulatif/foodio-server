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
exports.MenuItemController = void 0;
const common_1 = require("@nestjs/common");
const menu_item_service_1 = require("./menu-item.service");
const create_menu_item_dto_1 = require("./dto/create-menu-item.dto");
const update_menu_item_dto_1 = require("./dto/update-menu-item.dto");
const sendResponse_1 = require("../../common/shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const jwt_auth_guard_1 = require("../../common/auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/auth/guards/roles.guard");
const roles_decorator_1 = require("../../common/auth/decorators/roles.decorator");
const enums_1 = require("../../../generated/prisma/enums");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../../config/multer.config");
let MenuItemController = class MenuItemController {
    menuItemService;
    constructor(menuItemService) {
        this.menuItemService = menuItemService;
    }
    async createMenuItem(file, payload) {
        const finalPayload = {
            ...payload,
            imageUrl: file?.path,
        };
        const result = await this.menuItemService.createMenuItem(finalPayload);
        return (0, sendResponse_1.sendResponse)({
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'Menu item created successfully',
            data: result,
        });
    }
    async findAllMenuItems(query) {
        const result = await this.menuItemService.findAllMenuItems(query);
        return (0, sendResponse_1.sendResponse)({
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Menu items retrieved successfully',
            data: result.data,
            meta: result.meta,
        });
    }
    async findMenuItemById(id) {
        const result = await this.menuItemService.findMenuItemById(id);
        return (0, sendResponse_1.sendResponse)({
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Menu item retrieved successfully',
            data: result,
        });
    }
    async updateMenuItem(id, payload) {
        const result = await this.menuItemService.updateMenuItem(id, payload);
        return (0, sendResponse_1.sendResponse)({
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Menu item updated successfully',
            data: result,
        });
    }
    async removeMenuItem(id) {
        const result = await this.menuItemService.removeMenuItem(id);
        return (0, sendResponse_1.sendResponse)({
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Menu item removed successfully',
            data: result,
        });
    }
};
exports.MenuItemController = MenuItemController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multer_config_1.multerOptions)),
    (0, common_1.Post)(),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_menu_item_dto_1.CreateMenuItemDto]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "createMenuItem", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "findAllMenuItems", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "findMenuItemById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_menu_item_dto_1.UpdateMenuItemDto]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "updateMenuItem", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "removeMenuItem", null);
exports.MenuItemController = MenuItemController = __decorate([
    (0, common_1.Controller)('menu-item'),
    __metadata("design:paramtypes", [menu_item_service_1.MenuItemService])
], MenuItemController);
//# sourceMappingURL=menu-item.controller.js.map