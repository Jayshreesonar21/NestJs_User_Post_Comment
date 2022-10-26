import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import environmentConfig from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: environmentConfig.DATABASE_CONFIG.HOST,
      port: parseInt(environmentConfig.DATABASE_CONFIG.PORT),
      username: environmentConfig.DATABASE_CONFIG.USER,
      password: environmentConfig.DATABASE_CONFIG.PASSWORD,
      database: environmentConfig.DATABASE_CONFIG.NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
