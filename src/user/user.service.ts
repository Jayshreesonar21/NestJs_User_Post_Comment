import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserData } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(userData: CreateUserDto): Promise<UserData> {
    try {
      const { username, email, password } = userData;
      const user = await this.usersRepository.save({
        username,
        email,
        password,
      });
      return user;
    } catch (err) {
      console.log(':::::: Register user error :::::: ', err);
    }
  }
}
