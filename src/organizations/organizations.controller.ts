import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrganizationDto } from './dto/organization.dto';
import { plainToClass } from 'class-transformer';
import { CreateOrganizationDto } from './dto/create.organization.dto';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  //Find all organizations
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({
    status: 200,
    description: 'Return all organizations.',
    type: OrganizationDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<OrganizationDto[]> {
    const organizations = await this.organizationsService.findAll();
    return organizations.map((organization) =>
      plainToClass(OrganizationDto, organization),
    );
  }

  //Find one organization
  @ApiOperation({ summary: 'Get an organization by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return an organization by ID.',
    type: [OrganizationDto],
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the organization to retrieve',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OrganizationDto> {
    const organization = await this.organizationsService.findOne(id);
    return plainToClass(OrganizationDto, organization);
  }

  //Create an organization
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({
    status: 201,
    description: 'The organization has been successfully created.',
    type: OrganizationDto,
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
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<OrganizationDto> {
    return this.organizationsService.create(createOrganizationDto);
  }
}
