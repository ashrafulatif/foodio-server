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

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { sendResponse } from 'src/common/shared/sendResponse';
import status from 'http-status';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/common/auth/guards/roles.guard';
import { UserRole } from 'generated/prisma/enums';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const result =
      await this.categoriesService.createCategory(createCategoryDto);

    return sendResponse({
      statusCode: status.CREATED,
      success: true,
      message: 'Category created successfully',
      data: result,
    });
  }

  @Get()
  async findAllCategories(@Query() query: string) {
    const result = await this.categoriesService.findAllCategories(query);

    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Categories fetched successfully',
      data: result,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.categoriesService.findOne(id);

    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Category fetched successfully',
      data: result,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const result = await this.categoriesService.updateCategory(
      id,
      updateCategoryDto,
    );

    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Category updated successfully',
      data: result,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    const result = await this.categoriesService.removeCategory(id);

    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Category deleted successfully',
      data: result,
    });
  }
}
