import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientsService } from './clients/clients.service';
import { CreateClientDto } from './clients/dto/create.client.dto';
import { CreateUserDto } from './users_admin/dto/create.user.dto';
import { UsersService } from './users_admin/users.service';
import { PlansService } from './plans/plans.service';
import { CreatePlanDto } from './plans/dto/create.plan.dto';
import { ContractsService } from './contracts/contracts.service';
import { CreateContractDto } from './contracts/dto/create.contract.dto';
import { PermissionsService } from './permissions_admin/permissions.service';
import { ProfilesService } from './profiles_admin/profiles.service';
import { DataSource } from 'typeorm';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);
const logger = new Logger('AdminSeedService');

@Injectable()
export class AdminSeedService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly clientService: ClientsService,
    private readonly plansService: PlansService,
    private readonly contractsService: ContractsService,
    private readonly permissionsService: PermissionsService,
    private readonly profilesService: ProfilesService,
    private readonly dataSource: DataSource,
  ) {}

  async onModuleInit() {
    const permissionsList = [
      // Usuários
      'user.create',
      'user.read',
      'user.update',
      'user.delete',

      // Perfis
      'profile.create',
      'profile.read',
      'profile.update',
      'profile.delete',

      // Permissões
      'permission.create',
      'permission.read',
      'permission.update',
      'permission.delete',

      // Clientes
      'client.create',
      'client.read',
      'client.update',
      'client.delete',

      // Contratos
      'contract.create',
      'contract.read',
      'contract.update',
      'contract.delete',

      // Planos
      'plan.create',
      'plan.read',
      'plan.update',
      'plan.delete',
    ];

    logger.log('Initializing seed data...');

    //seed de clientes
    const clients = await this.clientService.findAll();
    if (clients.length === 0) {
      // create db_client_template
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.query(`CREATE DATABASE \`db_client_template\``);

      // Chamar o script externo para rodar migrações
      const command = `npx ts-node -r tsconfig-paths/register src/scripts/run-client-migrations.ts template`;
      const { stdout } = await execAsync(command);

      logger.log(`${stdout}`);

      logger.log('Database db_client_template created...');

      // seed de clientes
      clients.push(
        await this.clientService.create({
          client_type: 'company',
          company: {
            company_name: 'Company Inc',
            tax_id_number: '123-45-6789',
            contact_person: 'John Doe',
          },
          status: 'active',
          notes: 'Some notes about the client',
        } as CreateClientDto),
      );
      logger.log('Clients seeded...');
    } else {
      logger.log('Clients already seeded...');
    }

    //seed de planos
    const plans = await this.plansService.findAll();
    if (plans.length === 0) {
      plans.push(
        await this.plansService.create({
          name: 'Deluxe',
          price: 99.45,
          expiration: '2027-12-31',
          status: 'active',
        } as CreatePlanDto),
      );
      logger.log('Plans seeded...');
    } else {
      logger.log('Plans already seeded...');
    }

    //seed de contratos
    const contracts = await this.contractsService.findAll();
    if (contracts.length === 0) {
      contracts.push(
        await this.contractsService.create({
          contracted_price: 99.45,
          contract_date: '2024-08-01',
          status: 'active',
          client_id: clients[0].client_id,
          plan_id: plans[0].plan_id,
        } as CreateContractDto),
      );
      logger.log('Contracts seeded...');
    } else {
      logger.log('Contracts already seeded...');
    }

    //seed de permissões
    let createdPermissions = 0;
    for (const role of permissionsList) {
      const permissionExists = await this.permissionsService.findByRole(role);
      if (!permissionExists) {
        this.permissionsService.create({
          role,
        });
        createdPermissions++;
      }
    }

    if (createdPermissions > 0) {
      logger.log(createdPermissions + ' Permissions seeded...');
    } else {
      logger.log('Permissions already seeded...');
    }

    // Seed de perfis
    const profiles = await this.profilesService.findAll();
    if (profiles.length === 0) {
      // Obter as permissões necessárias
      const allPermissions = await this.permissionsService.findAll();
      profiles.push(
        await this.profilesService.create({
          name: 'Super Cow',
          permissions: allPermissions.map((permission) => permission.role), // Associa todas as permissões ao perfil Admin
        }),
      );
      logger.log('Profiles seeded...');
    } else {
      logger.log('Profiles already seeded...');
    }

    //seed de users
    const users = await this.usersService.findAll();
    if (users.length === 0) {
      await this.usersService.create({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'yourpassword',
        phone: '1234567890',
        profile_id: profiles[0].profile_id,
        address: {
          street: '1234 Main St',
          number: 'Apt 123',
          additional_info: 'Some additional info',
          city: 'Springfield',
          state: 'IL',
          country: 'USA',
          postal_code: '62701',
          address_type: 'billing',
        },
      } as CreateUserDto);
      logger.log('Users seeded...');
    } else {
      logger.log('Users already seeded...');
    }

    logger.log('Finished seeding data!');
  }
}
