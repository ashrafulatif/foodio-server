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
exports.MenuItemService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginationAndSorting_1 = __importDefault(require("../../common/utils/paginationAndSorting"));
let MenuItemService = class MenuItemService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMenuItem(payload) {
        const { name, description, price, imageUrl, available, categoryId } = payload;
        const existing = await this.prisma.menuItem.findFirst({
            where: {
                name: payload.name,
                categoryId: payload.categoryId,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Menu item with this name already exists in this category');
        }
        const category = await this.prisma.category.findUnique({
            where: { id: payload.categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        const result = await this.prisma.menuItem.create({
            data: {
                name,
                description,
                price,
                imageUrl,
                available,
                categoryId,
            },
            include: {
                category: true,
            },
        });
        return result;
    }
    async findAllMenuItems(query) {
        const { search, categoryId, available } = query;
        const { page, limit, skip, sortBy, sortOrder } = (0, paginationAndSorting_1.default)(query);
        const andConditions = [];
        if (search) {
            andConditions.push({
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                ],
            });
        }
        if (categoryId) {
            andConditions.push({
                categoryId,
            });
        }
        if (available !== undefined) {
            andConditions.push({
                available: available === 'true',
            });
        }
        const whereCondition = andConditions.length ? { AND: andConditions } : {};
        const result = await this.prisma.menuItem.findMany({
            where: whereCondition,
            skip,
            take: limit,
            orderBy: {
                [sortBy]: sortOrder,
            },
            include: {
                category: true,
            },
        });
        const total = await this.prisma.menuItem.count({
            where: whereCondition,
        });
        return {
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            data: result,
        };
    }
    async findMenuItemById(id) {
        const menuItem = await this.prisma.menuItem.findUnique({
            where: { id },
            include: { category: true },
        });
        if (!menuItem) {
            throw new common_1.NotFoundException('Menu item not found');
        }
        return menuItem;
    }
    async updateMenuItem(id, updateMenuItemDto) {
        if (updateMenuItemDto.categoryId) {
            const category = await this.prisma.category.findUnique({
                where: { id: updateMenuItemDto.categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException('Category not found');
            }
        }
        return await this.prisma.menuItem.update({
            where: { id },
            data: {
                ...(updateMenuItemDto.name !== undefined && {
                    name: updateMenuItemDto.name.trim(),
                }),
                ...(updateMenuItemDto.description !== undefined && {
                    description: updateMenuItemDto.description?.trim(),
                }),
                ...(updateMenuItemDto.price !== undefined && {
                    price: updateMenuItemDto.price,
                }),
                ...(updateMenuItemDto.imageUrl !== undefined && {
                    imageUrl: updateMenuItemDto.imageUrl,
                }),
                ...(updateMenuItemDto.available !== undefined && {
                    available: updateMenuItemDto.available,
                }),
                ...(updateMenuItemDto.categoryId !== undefined && {
                    categoryId: updateMenuItemDto.categoryId,
                }),
            },
            include: {
                category: true,
            },
        });
    }
    async removeMenuItem(id) {
        return await this.prisma.menuItem.delete({
            where: { id },
        });
    }
};
exports.MenuItemService = MenuItemService;
exports.MenuItemService = MenuItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MenuItemService);
//# sourceMappingURL=menu-item.service.js.map