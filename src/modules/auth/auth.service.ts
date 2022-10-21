import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto, LoginUserDto } from './dto';
import { UserData } from '../user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserCreds(email: string, password: string): Promise<UserData> {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new BadRequestException();
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async register(userData: RegisterUserDto): Promise<UserData> {
    try {
      const { email } = userData;
      const isExist = await this.userService.getUserByEmail(email);
      if (isExist) {
        throw new BadRequestException('User already exist.');
      }
      const user = await this.userService.register(userData);
      return user;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
    };
  }
}
