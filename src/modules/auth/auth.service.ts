/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    //check if user already exists
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    //hash password
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...payload,
        password: hashedPassword,
      },
    });

    const { password, ...safeUser } = user;

    return safeUser;
  }

  async login(payload: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(payload.password, user.password);

    if (!match) throw new UnauthorizedException('Invalid credentials');

    const tokenPayload = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    //create jwt token
    const accessToken = this.jwtService.sign(tokenPayload, {
      expiresIn: '1d',
    });

    //exlude pass from response
    const { password, ...safeUser } = user;

    return {
      accessToken,
      user: safeUser,
    };
  }
}
