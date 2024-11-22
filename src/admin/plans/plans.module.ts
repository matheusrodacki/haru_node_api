import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { Plan } from './plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  providers: [PlansService],
  controllers: [PlansController],
  exports: [PlansService, TypeOrmModule],
})
export class PlansModule {}
