import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(companyDto: CompanyDto): Promise<Company> {
    const company = this.companyRepository.create(companyDto);
    return await this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findOne(client_id: number): Promise<Company> {
    return this.companyRepository.findOne({
      where: { client_id: client_id },
    });
  }

  async update(
    client_id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { client_id: client_id },
    });
    if (!company) {
      throw new BadRequestException("Company doesn't exist");
    }
    Object.assign(company, updateCompanyDto);
    return await this.companyRepository.save(company);
  }

  async remove(client_id: number) {
    const company = await this.companyRepository.findOne({
      where: { client_id: client_id },
    });
    if (!company) {
      throw new BadRequestException("Company doesn't exist");
    }
    await this.companyRepository.remove(company);
    return `This action removes a #${client_id} company`;
  }
}
