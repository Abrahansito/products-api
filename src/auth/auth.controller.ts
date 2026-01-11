import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

interface LoginDto {
  username: string;
  password: string;
}

interface RegisterDto {
  username: string;
  password: string;
  email?: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(
      loginDto.username,
      loginDto.password,
    );
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  validateToken() {
    return { valid: true };
  }
}