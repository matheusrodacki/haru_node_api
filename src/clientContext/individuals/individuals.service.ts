import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateIndividualDto } from './dto/update-individual.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Individual } from './individual.entity';
import { Repository } from 'typeorm';
import { IndividualDto } from './dto/individual.dto';

@Injectable()
export class IndividualsService {
  constructor(
    @InjectRepository(Individual)
    private readonly individualRepository: Repository<Individual>,
  ) {}

  async create(individualDto: IndividualDto): Promise<Individual> {
    const individual = this.individualRepository.create(individualDto);
    return await this.individualRepository.save(individual);
  }

  async findAll(): Promise<Individual[]> {
    return await this.individualRepository.find();
  }

  async findOne(client_id: number): Promise<Individual> {
    return await this.individualRepository.findOne({ where: { client_id } });
  }

  async update(
    client_id: number,
    updateIndividualDto: UpdateIndividualDto,
  ): Promise<Individual> {
    const individual = await this.individualRepository.findOne({
      where: { client_id },
    });
    if (!individual) {
      throw new BadRequestException("Individual doesn't exist");
    }
    Object.assign(individual, updateIndividualDto);
    return await this.individualRepository.save(individual);
  }

  async remove(client_id: number): Promise<string> {
    const individual = await this.individualRepository.findOne({
      where: { client_id },
    });
    if (!individual) {
      throw new BadRequestException("Individual doesn't exist");
    }
    await this.individualRepository.remove(individual);
    return `This action removes a #${client_id} individual`;
  }
}
