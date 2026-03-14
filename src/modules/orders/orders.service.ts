/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from 'generated/prisma/enums';
import paginationAndSortHelper from 'src/common/utils/paginationAndSorting';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(payload: CreateOrderDto, userId: string) {
    const menuItemIds = payload.items.map((item) => item.menuItemId);

    // check menu item availaibility + validatily
    const menuItems = await this.prisma.menuItem.findMany({
      where: {
        id: {
          in: menuItemIds,
        },
        available: true,
      },
    });

    if (menuItems.length !== payload.items.length) {
      throw new NotFoundException(
        'One or more menu items are invalid or unavailable',
      );
    }

    // prepare order items total price
    const orderItemsData = payload.items.map((item) => {
      const menuItem = menuItems.find((m) => m.id === item.menuItemId)!;
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: menuItem.price * item.quantity,
      };
    });

    const total = orderItemsData.reduce((sum, item) => sum + item.price, 0);

    //create order
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

    // fetch data full order
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

  async findAllOrder(query: any) {
    const { page, limit, skip } = paginationAndSortHelper(query);

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
        totalPage: Math.ceil(total / limit),
      },
      data: orders,
    };
  }

  async findAllCustomerOrder(userId: string) {
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

  async findOrderById(id: string) {
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

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateOrderStatus(id: string, updateOrderDto: UpdateOrderDto) {
    const status = (updateOrderDto as { status?: OrderStatus }).status;

    if (!status) {
      throw new BadRequestException('status is required');
    }

    try {
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
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async removeOrder(id: string) {
    try {
      return await this.prisma.order.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Order not found');
      }
    }
    throw error;
  }
}
