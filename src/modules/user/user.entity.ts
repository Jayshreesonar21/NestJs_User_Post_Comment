import * as bcrypt from 'bcrypt';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  getConnection,
  getRepository,
  getConnectionManager,
} from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { IsEmail, MinLength, MaxLength } from 'class-validator';
import environmentConfig from '../../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Connection from 'mysql2/typings/mysql/lib/Connection';
import { createConnection } from 'net';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @BeforeInsert()
  async bcryptPassword() {
    const saltOrRounds = Number(environmentConfig.BCRYPT.SALT);
    const hash = await bcrypt.hash(this.password, saltOrRounds);
    this.password = hash;
  }
}
