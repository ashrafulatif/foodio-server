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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../../generated/prisma/enums");
class CreateOrderItemDto {
    menuItemId;
    quantity;
}
__decorate([
    (0, class_validator_1.IsString)({ message: 'Menu item ID must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Menu item ID is required' }),
    (0, class_validator_1.IsUUID)(undefined, { message: 'Menu item ID must be a valid UUID' }),
    __metadata("design:type", String)
], CreateOrderItemDto.prototype, "menuItemId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'Quantity must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'Quantity must be at least 1' }),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "quantity", void 0);
class CreateOrderDto {
    paymentMethod;
    address;
    items;
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.PaymentMethod, { message: 'Invalid payment method' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Address must be a string' }),
    (0, class_validator_1.MaxLength)(255, { message: 'Address cannot exceed 255 characters' }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'Items must be an array' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'At least one item is required' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateOrderItemDto),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
//# sourceMappingURL=create-order.dto.js.map