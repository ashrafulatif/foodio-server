/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { sendResponse } from 'src/common/shared/sendResponse';
import status from 'http-status';
import { RolesGuard } from 'src/common/auth/guards/roles.guard';
import { Roles } from 'src/common/auth/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/enums';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CUSTOMER)
  async createOrder(@Body() payload: CreateOrderDto, @Req() req: any) {
    const result = await this.ordersService.createOrder(
      payload,
      req.user.userId,
    );
    return sendResponse({
      statusCode: status.CREATED,
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAllOrder() {
    const result = await this.ordersService.findAllOrder();
    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Orders retrieved successfully',
      data: result,
    });
  }

  @Get('my-orders')
  @UseGuards(RolesGuard)
  @Roles(UserRole.CUSTOMER)
  async findAllCustomerOrder(@Req() req: any) {
    const result = await this.ordersService.findAllCustomerOrder(
      req.user.userId,
    );
    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Orders retrieved successfully',
      data: result,
    });
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CUSTOMER)
  async findOrderById(@Param('id') id: string) {
    const result = await this.ordersService.findOrderById(id);
    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Order retrieved successfully',
      data: result,
    });
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const result = await this.ordersService.updateOrderStatus(
      id,
      updateOrderDto,
    );
    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Order status updated successfully',
      data: result,
    });
  }
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async removeOrder(@Param('id') id: string) {
    const result = await this.ordersService.removeOrder(id);
    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Order removed successfully',
      data: result,
    });
  }
}
