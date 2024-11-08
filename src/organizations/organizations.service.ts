import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './dto/create.organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
  ) {}

  findAll(): Promise<Organization[]> {
    return this.organizationsRepository.find({ relations: ['users'] });
  }

  findOne(id: number): Promise<Organization> {
    return this.organizationsRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const organization = this.organizationsRepository.create(
      createOrganizationDto,
    );
    return this.organizationsRepository.save(organization);
  }
}
