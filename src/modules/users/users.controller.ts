/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { sendResponse } from 'src/common/shared/sendResponse';
import status from 'http-status';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/auth/guards/roles.guard';
import { Roles } from 'src/common/auth/decorators/roles.decorator';
import { UserRole } from 'generated/prisma/enums';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAllUsers() {
    const result = await this.usersService.findAllUsers();
    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    });
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CUSTOMER)
  @Get('me')
  async getProfile(@Req() req: any) {
    const result = await this.usersService.getMyProfile(req.user.userId);
    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Profile retrieved successfully',
      data: result,
    });
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CUSTOMER)
  @Patch('update-profile')
  async updateProfile(@Body() payload: UpdateUserDto, @Req() req: any) {
    const result = await this.usersService.updateProfile(
      payload,
      req.user.userId,
    );
    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Profile updated successfully',
      data: result,
    });
  }
}
