import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  address: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers() {
    return this.prisma.user.findMany({
      select: safeUserSelect,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMyProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: safeUserSelect,
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async updateProfile(payload: UpdateUserDto, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const updatedUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...payload,
      },
      select: safeUserSelect,
    });

    return updatedUser;
  }
}
