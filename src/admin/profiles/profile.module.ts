import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Profile } from './profile.entity';
import { Permission } from '../permissions/permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Permission])],
  providers: [ProfilesService],
  controllers: [ProfilesController],
  exports: [ProfilesService, TypeOrmModule],
})
export class ProfilesModule {}
