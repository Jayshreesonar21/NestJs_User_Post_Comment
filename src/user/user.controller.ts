import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { IsExistInterceptor } from './user.interceptor';

@UseInterceptors(IsExistInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: number,
  ) {
    return await this.userService.findOne(userId);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Delete(':id')
  async remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: number,
  ) {
    return await this.userService.remove(userId);
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: number,
    @Body() userData: UpdateUserDto,
  ) {
    return await this.userService.update(userId, userData);
  }
}
