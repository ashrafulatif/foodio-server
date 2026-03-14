import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuItemService {
  constructor(private readonly prisma: PrismaService) {}

  async createMenuItem(payload: CreateMenuItemDto) {
    const { name, description, price, imageUrl, available, categoryId } =
      payload;

    //find category to check if it exists
    const category = await this.prisma.category.findUnique({
      where: { id: payload.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    try {
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
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAllMenuItems() {
    return this.prisma.menuItem.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    });
  }

  async findMenuItemById(id: string) {
    //find menu item
    const menuItem = await this.prisma.menuItem.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!menuItem) {
      throw new NotFoundException('Menu item not found');
    }

    return menuItem;
  }

  async updateMenuItem(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    if (updateMenuItemDto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: updateMenuItemDto.categoryId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }

    try {
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
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async removeMenuItem(id: string) {
    try {
      return await this.prisma.menuItem.delete({
        where: { id },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Menu item not found');
      }

      if (error.code === 'P2002') {
        throw new ConflictException(
          'Duplicate value violates unique constraint',
        );
      }
    }

    throw error;
  }
}
