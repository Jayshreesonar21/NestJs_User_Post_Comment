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

  async findAll(): Promise<User[]> {
    try {
      const users = await this.usersRepository.find({
        where: { isDeleted: false },
      });
      return users;
    } catch (err) {
      console.log(':::::: FindAll user error :::::: ', err);
    }
  }

  async findOne(userId: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId, isDeleted: false },
      });
      return user;
    } catch (err) {
      console.log(':::::: FindOne user error :::::: ', err);
    }
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
      console.log(':::::: Create user error :::::: ', err);
    }
  }

  async remove(userId: number): Promise<{ message: string }> {
    try {
      await this.usersRepository
        .createQueryBuilder('user')
        .update(User)
        .set({ isDeleted: true })
        .where('id = :id', { id: userId })
        .execute();
      return { message: 'Record deleted successfully' };
    } catch (err) {
      console.log(':::::::: Delete user error :::::::', err);
    }
  }
}
