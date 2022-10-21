import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RegisterUserDto } from '../auth/dto';

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
      return err;
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
      return err;
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
      return err;
    }
  }

  async update(
    userId: number,
    userData: UpdateUserDto,
  ): Promise<{ message: string }> {
    try {
      await this.usersRepository
        .createQueryBuilder('user')
        .update(User)
        .set({ ...userData })
        .where('id = :id', { id: userId })
        .andWhere('isDeleted = :isDeleted', { isDeleted: false })
        .execute();
      return { message: 'Record updated successfully' };
    } catch (err) {
      console.log(':::::::: Update user error :::::::', err);
      return err;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email, isDeleted: false },
      });
      return user;
    } catch (err) {
      console.log(':::::: getUserByEmail error ::::::: ', err);
      return err;
    }
  }

  async register(userData: RegisterUserDto): Promise<User | undefined> {
    try {
      const { username, email, password } = userData;
      const user = new User();
      Object.assign(user, { username, email, password });
      return await this.usersRepository.save(user);
    } catch (err) {
      console.log(':::::: Register user error :::::: ', err);
      return err;
    }
  }
}
