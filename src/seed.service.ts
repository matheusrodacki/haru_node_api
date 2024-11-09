import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create.user.dto';
import { CreateOrganizationDto } from './organizations/dto/create.organization.dto';
import { OrganizationsService } from './organizations/organizations.service';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly organizationsService: OrganizationsService,
  ) {}

  async onModuleInit() {
    const organizations = await this.organizationsService.findAll();
    if (organizations.length === 0) {
      organizations.push(
        await this.organizationsService.create({
          name: 'Tech Corp',
        } as CreateOrganizationDto),
      );
    }

    const users = await this.usersService.findByOrganizationId(
      organizations[0].id,
    );
    if (users.length === 0) {
      await this.usersService.create({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'yourpassword',
        role: 'superadmin',
        organizationId: organizations[0].id,
      } as CreateUserDto);
    }
  }
}
