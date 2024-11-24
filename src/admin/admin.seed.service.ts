import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientsService } from './clients/clients.service';
import { CreateClientDto } from './clients/dto/create.client.dto';
import { CreateUserDto } from './users_admin/dto/create.user.dto';
import { UsersService } from './users_admin/users.service';
import { PlansService } from './plans/plans.service';
import { CreatePlanDto } from './plans/dto/create.plan.dto';
import { ContractsService } from './contracts/contracts.service';
import { CreateContractDto } from './contracts/dto/create.contract.dto';

@Injectable()
export class AdminSeedService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly clientService: ClientsService,
    private readonly plansService: PlansService,
    private readonly contractsService: ContractsService,
  ) {}

  async onModuleInit() {
    const clients = await this.clientService.findAll();
    if (clients.length === 0) {
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
    }

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
    }

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
    }

    const users = await this.usersService.findAll();
    if (users.length === 0) {
      await this.usersService.create({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'yourpassword',
        phone: '1234567890',
        role: 'superadmin',
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
    }
  }
}
