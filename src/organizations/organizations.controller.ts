import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Put,
  Delete,
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
import { CreateOrganizationDto } from './dto/create.organization.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateOrganizationDto } from './dto/update.organization.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly usersService: UsersService,
  ) {}

  //Find all organizations
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({
    status: 200,
    description: 'Return all organizations.',
    type: OrganizationDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  @Get()
  async findAll(): Promise<OrganizationDto[]> {
    return await this.organizationsService.findAll();
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OrganizationDto> {
    return await this.organizationsService.findOne(id);
  }

  // Get users of an organization
  @ApiOperation({ summary: 'Get users of an organization' })
  @ApiResponse({
    status: 200,
    description: 'List of users in the organization',
    type: [UserDto],
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the organization',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  @Get(':id/users')
  async getUsers(@Param('id') id: number): Promise<UserDto[]> {
    return await this.usersService.findByOrganizationId(id);
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
    return await this.organizationsService.create(createOrganizationDto);
  }

  //Update an organization
  @ApiOperation({ summary: 'Update an organization' })
  @ApiResponse({
    status: 200,
    description: 'The organization has been successfully updated.',
    type: OrganizationDto,
  })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<OrganizationDto> {
    return await this.organizationsService.update(id, updateOrganizationDto);
  }

  //Delete an organization
  @ApiOperation({ summary: 'Delete an organization' })
  @ApiResponse({
    status: 200,
    description: 'The organization has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.organizationsService.remove(id);
  }
}
