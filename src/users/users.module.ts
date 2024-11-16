import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from 'src/clients/client.module';
import { Client } from 'src/clients/client.entity';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Client]),
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
