import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({ status: 200, description: 'Return all organizations.' })
  @Get()
  findAll(): Promise<Organization[]> {
    return this.organizationsService.findAll();
  }

  @ApiOperation({ summary: 'Get an organization by ID' })
  @ApiResponse({ status: 200, description: 'Return an organization by ID.' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the organization to retrieve',
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Organization> {
    return this.organizationsService.findOne(id);
  }

  @Post()
  create(@Body() organization: Organization): Promise<Organization> {
    return this.organizationsService.create(organization);
  }
}
