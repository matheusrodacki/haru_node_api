import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';

@Module({
  imports: [
    UsersModule,
    OrganizationsModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UsersService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [UsersService, JwtModule],
})
export class AuthModule {}
