import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user/dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World';
  }
}
