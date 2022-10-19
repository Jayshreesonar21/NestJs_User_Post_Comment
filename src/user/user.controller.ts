import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser() {
    return this.userService.findAll();
  }

  @Post('register')
  registerUser(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }
}
