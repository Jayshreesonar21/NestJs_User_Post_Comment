import { HttpException } from '@nestjs/common/exceptions/http.exception';
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Module,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IsExistInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(async () => {
        try {
          const request = context.switchToHttp().getRequest();
          const userId = request.params?.id;
          if (userId) {
            const user = await this.usersRepository.findOne({
              where: { id: Number(userId), isDeleted: false },
            });

            if (!user) {
              throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
            }
          }
        } catch (err) {
          console.log(err);
          return err;
        }
      }),
    );
  }
}
