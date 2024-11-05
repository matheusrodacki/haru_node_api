import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({ status: 200, description: 'Return all organizations.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Organization> {
    return this.organizationsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({
    status: 201,
    description: 'The organization has been successfully created.',
  })
  @ApiBody({
    description: 'The organization data to create a new organization',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Tech Corp' },
      },
      required: ['name'],
    },
  })
  @Post()
  create(@Body() organization: Organization): Promise<Organization> {
    return this.organizationsService.create(organization);
  }
}
