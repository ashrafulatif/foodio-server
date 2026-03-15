import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { sendResponse } from 'src/common/shared/sendResponse';
import status from 'http-status';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const result = await this.authService.register(body);

    return sendResponse({
      statusCode: status.CREATED,
      success: true,
      message: 'Registered successfully',
      data: result,
    });
  }

  @Post('login')
  async login(@Body() body: LoginDto, @Res({ passthrough: true }) res) {
    const result = await this.authService.login(body);

    //set accesstoken in cookie
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 60 * 60 * 24 * 1000, //1 day
    });

    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Logged in successfully',
      data: result,
    });
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res) {
    res.clearCookie('accessToken');
    return sendResponse({
      statusCode: status.OK,
      success: true,
      message: 'Logged out successfully',
    });
  }
}
