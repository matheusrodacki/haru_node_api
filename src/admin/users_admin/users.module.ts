import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user.entity';
import { Client } from '../clients/client.entity';
import { ClientsModule } from '../clients/clients.module';
import { Profile } from '../profiles_admin/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Client, Profile]),
    forwardRef(() => ClientsModule),
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
