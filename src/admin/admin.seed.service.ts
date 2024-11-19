import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientsService } from './clients/clients.service';
import { CreateClientDto } from './clients/dto/create.client.dto';
import { CreateUserDto } from './users_admin/dto/create.user.dto';
import { UsersService } from './users_admin/users.service';

@Injectable()
export class AdminSeedService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly clientService: ClientsService,
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
