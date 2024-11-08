import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './dto/create.organization.dto';
import { UpdateOrganizationDto } from './dto/update.organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
  ) {}

  async findAll(): Promise<Organization[]> {
    return await this.organizationsRepository.find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Organization> {
    return this.organizationsRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }
  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const organization = this.organizationsRepository.create(
      createOrganizationDto,
    );
    return await this.organizationsRepository.save(organization);
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = await this.organizationsRepository.findOne({
      where: { id },
      relations: ['users'],
    });
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    Object.assign(organization, updateOrganizationDto);
    return await this.organizationsRepository.save(organization);
  }

  async remove(id: number): Promise<void> {
    const organization = await this.organizationsRepository.findOne({
      where: { id },
    });
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    await this.organizationsRepository.remove(organization);
  }
}
