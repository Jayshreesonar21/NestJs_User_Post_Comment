import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: RegisterUserDto) {
    return await this.authService.register(userData);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<any> {
    return req.user;
  }
}
