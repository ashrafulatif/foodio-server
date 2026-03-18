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
exports.CreateMenuItemDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateMenuItemDto {
    name;
    description;
    price;
    imageUrl;
    available;
    categoryId;
}
exports.CreateMenuItemDto = CreateMenuItemDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is required' }),
    (0, class_validator_1.MinLength)(2, { message: 'Name must be at least 2 characters long' }),
    __metadata("design:type", String)
], CreateMenuItemDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Description must be a string' }),
    (0, class_validator_1.MaxLength)(500, {
        message: 'Description must be at most 500 characters long',
    }),
    (0, class_validator_1.MinLength)(2, { message: 'Description must be at least 2 characters long' }),
    __metadata("design:type", String)
], CreateMenuItemDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'Price must be a valid number with up to 2 decimal places' }),
    (0, class_validator_1.Min)(0, { message: 'Price must be greater than or equal to 0' }),
    __metadata("design:type", Number)
], CreateMenuItemDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Image URL must be a string' }),
    (0, class_validator_1.IsUrl)({}, { message: 'Image URL must be a valid URL' }),
    __metadata("design:type", String)
], CreateMenuItemDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'Available must be a boolean value' }),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], CreateMenuItemDto.prototype, "available", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Category ID must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Category ID is required' }),
    __metadata("design:type", String)
], CreateMenuItemDto.prototype, "categoryId", void 0);
//# sourceMappingURL=create-menu-item.dto.js.map