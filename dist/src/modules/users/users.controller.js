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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const sendResponse_1 = require("../../common/shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const jwt_auth_guard_1 = require("../../common/auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/auth/guards/roles.guard");
const roles_decorator_1 = require("../../common/auth/decorators/roles.decorator");
const enums_1 = require("../../../generated/prisma/enums");
const update_user_dto_1 = require("./dto/update-user.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAllUsers() {
        const result = await this.usersService.findAllUsers();
        return (0, sendResponse_1.sendResponse)({
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Users retrieved successfully',
            data: result,
        });
    }
    async getProfile(req) {
        const result = await this.usersService.getMyProfile(req.user.userId);
        return (0, sendResponse_1.sendResponse)({
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Profile retrieved successfully',
            data: result,
        });
    }
    async updateProfile(payload, req) {
        const result = await this.usersService.updateProfile(payload, req.user.userId);
        return (0, sendResponse_1.sendResponse)({
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Profile updated successfully',
            data: result,
        });
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CUSTOMER),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.ADMIN, enums_1.UserRole.CUSTOMER),
    (0, common_1.Patch)('update-profile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map