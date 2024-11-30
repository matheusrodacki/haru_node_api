import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create.client.dto';
import { UpdateClientDto } from './dto/update.client.dto';
import { Company } from '../companies/company.entity';
import { Individual } from '../individuals/individual.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Individual)
    private individualRepository: Repository<Individual>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createClientsDto: CreateClientDto): Promise<Client> {
    // Inicia uma transação
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let client = this.clientRepository.create(createClientsDto);
      client = await this.clientRepository.save(client); // Save the client first

      // Create individual or company if applicable
      if (
        createClientsDto.client_type === 'individual' &&
        createClientsDto.individual
      ) {
        const individual = this.individualRepository.create({
          ...createClientsDto.individual,
          client,
        });
        await this.individualRepository.save(individual);
        client.individual = individual;
      } else if (
        createClientsDto.client_type === 'company' &&
        createClientsDto.company
      ) {
        const company = this.companyRepository.create({
          ...createClientsDto.company,
          client,
        });
        await this.companyRepository.save(company);
        client.company = company;
      }

      // **Criar o banco de dados do cliente**
      await queryRunner.query(
        `CREATE DATABASE \`db_client_${client.client_id}\``,
      );

      // Nome do banco de dados do cliente
      const clientDatabaseName = `db_client_${client.client_id}`;

      // Cria um novo DataSource para o banco de dados do cliente
      const clientDataSource = new DataSource({
        type: 'mysql', // ou o tipo de banco de dados que você está usando
        host: process.env.ADMIN_MYSQL_HOST,
        port: +process.env.MYSQL_PORT,
        username: process.env.ADMIN_MYSQL_USER,
        password: process.env.ADMIN_MYSQL_PASSWORD,
        database: clientDatabaseName,
        entities: [__dirname + '/../client/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../migrations/client/*{.ts,.js}'],
        synchronize: false,
      });

      await clientDataSource.initialize();
      await clientDataSource.runMigrations();
      await clientDataSource.destroy();

      return client;
    } catch (error) {
      // Reverte a transação em caso de erro
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Libera o queryRunner
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({
      relations: ['individual', 'company'],
    });
  }

  async findOne(client_id: number): Promise<Client> {
    return this.clientRepository.findOne({
      where: { client_id },
      relations: ['individual', 'company'],
    });
  }

  async update(
    client_id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { client_id },
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

    await this.clientRepository.softRemove(client);
  }
}
