import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import environmentConfig from '../../config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: environmentConfig.JWT.SECRET,
      signOptions: { expiresIn: environmentConfig.JWT.EXPIRESIN },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
