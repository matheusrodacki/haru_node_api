import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create.user.dto';
import { CreateClientDto } from './clients/dto/create.client.dto';
import { ClientsService } from './clients/client.service';

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
          name: 'Tech Corp',
        } as CreateClientDto),
      );
    }

    const users = await this.usersService.findByClientId(clients[0].client_id);
    if (users.length === 0) {
      await this.usersService.create({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'yourpassword',
        role: 'superadmin',
        clientId: clients[0].client_id,
      } as CreateUserDto);
    }
  }
}
