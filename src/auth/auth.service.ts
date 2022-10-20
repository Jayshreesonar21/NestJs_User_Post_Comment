import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserData } from './user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
  ) {}

  async register(userData: RegisterUserDto): Promise<UserData> {
    try {
      const { username, email, password } = userData;
      const user = await this.authRepository.save({
        username,
        email,
        password,
      });
      return user;
    } catch (err) {
      console.log(':::::: Register user error :::::: ', err);
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.authRepository.findOne({ where: { email } });
      if (user && user.password === password) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (err) {
      console.log('::::::::::::: err ::::::: ', err);
    }
  }
}
