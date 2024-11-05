import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  findAll(): Promise<Organization[]> {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Organization> {
    return this.organizationsService.findOne(id);
  }

  @Post()
  create(@Body() organization: Organization): Promise<Organization> {
    return this.organizationsService.create(organization);
  }
}
