import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

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

  async update(userId: number, userData: UpdateUserDto): Promise<any> {
    try {
      const user = await this.usersRepository
        .createQueryBuilder('user')
        .update(User)
        .set({ ...userData })
        .where('id = :id', { id: userId })
        .andWhere('isDeleted = :isDeleted', { isDeleted: false })
        .execute();
      return user;
    } catch (err) {
      console.log(':::::::: Update user error :::::::', err);
    }
  }
}
