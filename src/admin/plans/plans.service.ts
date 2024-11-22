import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './plan.entity';
import { CreatePlanDto } from './dto/create.plan.dto';
import { UpdatePlanDto } from './dto/update.plan.dto';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const plan = this.planRepository.create(createPlanDto);
    return await this.planRepository.save(plan);
  }

  async findAll(): Promise<Plan[]> {
    return await this.planRepository.find();
  }

  async findOne(plan_id: number): Promise<Plan> {
    return this.planRepository.findOne({
      where: { plan_id },
    });
  }

  async update(plan_id: number, updatePlanDto: UpdatePlanDto): Promise<Plan> {
    const plan = await this.planRepository.findOne({
      where: { plan_id },
    });
    if (!plan) {
      throw new NotFoundException('Plan not found');
    }
    Object.assign(plan, updatePlanDto);
    return await this.planRepository.save(plan);
  }

  async remove(plan_id: number): Promise<void> {
    const plan = await this.planRepository.findOne({
      where: { plan_id },
    });
    if (!plan) {
      throw new NotFoundException('Plan not found');
    }
    await this.planRepository.remove(plan);
  }
}
