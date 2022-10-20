import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params?.id;
    if (userId) {
      const user = await this.usersRepository.findOne({
        where: { id: Number(userId), isDeleted: false },
      });

      if (!user) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }
    }
    next();
  }
}
