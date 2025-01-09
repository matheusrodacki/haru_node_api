import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user.entity';
import { Profile } from '../profiles/profile.entity';
import { AddressAdmin } from '../addresses_admin/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AddressAdmin, Profile]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
