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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const paginationAndSorting_1 = __importDefault(require("../../common/utils/paginationAndSorting"));
let CategoriesService = class CategoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCategory(createCategoryDto) {
        const existingCategory = await this.prisma.category.findUnique({
            where: { name: createCategoryDto.name.trim() },
        });
        if (existingCategory) {
            throw new common_1.ConflictException('Category name already exists');
        }
        const result = await this.prisma.category.create({
            data: {
                name: createCategoryDto.name.trim(),
            },
        });
        return result;
    }
    async findAllCategories(query) {
        const { page, limit, skip } = (0, paginationAndSorting_1.default)(query);
        const result = await this.prisma.category.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        });
        const total = await this.prisma.category.count();
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
    async findOne(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async updateCategory(id, updateCategoryDto) {
        const existingCategory = await this.prisma.category.findUnique({
            where: { id },
        });
        if (!existingCategory) {
            throw new common_1.NotFoundException('Category not found');
        }
        return await this.prisma.category.update({
            where: { id },
            data: {
                ...(updateCategoryDto.name !== undefined && {
                    name: updateCategoryDto.name.trim(),
                }),
            },
        });
    }
    async removeCategory(id) {
        return await this.prisma.category.delete({
            where: { id },
        });
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map