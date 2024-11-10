import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create.client.dto';
import { UpdateClientDto } from './dto/update.client.dto';
import { Individual } from 'src/individuals/entities/individual.entity';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Individual)
    private individualRepository: Repository<Individual>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({ relations: ['users'] });
  }

  async findOne(client_id: number): Promise<Client> {
    return this.clientRepository.findOne({
      where: { client_id },
      relations: ['users'],
    });
  }

  async create(createClientsDto: CreateClientDto): Promise<Client> {
    let client = this.clientRepository.create(createClientsDto);
    client = await this.clientRepository.save(client); // Salva o cliente primeiro

    if (
      createClientsDto.clientType === 'individual' &&
      createClientsDto.individual
    ) {
      const individual = this.individualRepository.create({
        ...createClientsDto.individual,
        client,
      });
      await this.individualRepository.save(individual);
      client.individual = individual;
    } else if (
      createClientsDto.clientType === 'company' &&
      createClientsDto.company
    ) {
      const company = this.companyRepository.create({
        ...createClientsDto.company,
        client,
      });
      await this.companyRepository.save(company);
      client.company = company;
    }

    return client;
  }

  async update(
    client_id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { client_id },
      relations: ['users'],
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    Object.assign(client, updateClientDto);
    return await this.clientRepository.save(client);
  }

  async remove(client_id: number): Promise<void> {
    const client = await this.clientRepository.findOne({
      where: { client_id },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    await this.clientRepository.remove(client);
  }
}
