import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create.client.dto';
import { UpdateClientDto } from './dto/update.client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.clientsRepository.find({ relations: ['users'] });
  }

  async findOne(client_id: number): Promise<Client> {
    return this.clientsRepository.findOne({
      where: { client_id },
      relations: ['users'],
    });
  }

  async create(createClientsDto: CreateClientDto): Promise<Client> {
    const client = this.clientsRepository.create(createClientsDto);
    return await this.clientsRepository.save(client);
  }

  async update(
    client_id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    const client = await this.clientsRepository.findOne({
      where: { client_id },
      relations: ['users'],
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    Object.assign(client, updateClientDto);
    return await this.clientsRepository.save(client);
  }

  async remove(client_id: number): Promise<void> {
    const client = await this.clientsRepository.findOne({
      where: { client_id },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    await this.clientsRepository.remove(client);
  }
}
