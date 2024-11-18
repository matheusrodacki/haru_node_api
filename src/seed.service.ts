import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientsService } from './admin/clients_tenants/client.service';
import { CreateClientDto } from './admin/clients_tenants/dto/create.client.dto';
import { CreateUserDto } from './admin/users_admin/dto/create.user.dto';
import { UsersService } from './admin/users_admin/users.service';

@Injectable()
export class SeedService implements OnModuleInit {
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

    const users = await this.usersService.findByClientId(clients[0].client_id);
    if (users.length === 0) {
      await this.usersService.create({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'yourpassword',
        phone: '1234567890',
        role: 'superadmin',
        clientId: clients[0].client_id,
      } as CreateUserDto);
    }
  }
}
