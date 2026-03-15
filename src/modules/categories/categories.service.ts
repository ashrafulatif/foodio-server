/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import paginationAndSortHelper from 'src/common/utils/paginationAndSorting';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name.trim() },
    });

    if (existingCategory) {
      throw new ConflictException('Category name already exists');
    }

    const result = await this.prisma.category.create({
      data: {
        name: createCategoryDto.name.trim(),
      },
    });
    return result;
  }

  async findAllCategories(query: any) {
    const { page, limit, skip } = paginationAndSortHelper(query);

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

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new NotFoundException('Category not found');
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

  async removeCategory(id: string) {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
