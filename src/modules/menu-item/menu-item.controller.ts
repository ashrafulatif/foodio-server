import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { sendResponse } from 'src/common/shared/sendResponse';
import status from 'http-status';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/auth/guards/roles.guard';
import { Roles } from 'src/common/auth/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/enums';

@Controller('menu-item')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async createMenuItem(@Body() payload: CreateMenuItemDto) {
    const result = await this.menuItemService.createMenuItem(payload);
    return sendResponse({
      statusCode: status.CREATED,
      success: true,
      message: 'Menu item created successfully',
      data: result,
    });
  }

  @Get()
  async findAllMenuItems(@Query() query: string) {
    const result = await this.menuItemService.findAllMenuItems(query);
    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Menu items retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  }

  @Get(':id')
  async findMenuItemById(@Param('id') id: string) {
    const result = await this.menuItemService.findMenuItemById(id);
    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Menu item retrieved successfully',
      data: result,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async updateMenuItem(
    @Param('id') id: string,
    @Body() payload: UpdateMenuItemDto,
  ) {
    const result = await this.menuItemService.updateMenuItem(id, payload);
    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Menu item updated successfully',
      data: result,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async removeMenuItem(@Param('id') id: string) {
    const result = await this.menuItemService.removeMenuItem(id);
    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Menu item removed successfully',
      data: result,
    });
  }
}
