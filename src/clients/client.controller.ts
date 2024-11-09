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
import { ClientsService } from './client.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClienteDto } from './dto/client.dto';
import { CreateClientDto } from './dto/create.client.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateClientDto } from './dto/update.client.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly usersService: UsersService,
  ) {}

  // Find all clients
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({
    status: 200,
    description: 'Return all clients.',
    type: ClienteDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  @Get()
  async findAll(): Promise<ClienteDto[]> {
    return await this.clientsService.findAll();
  }

  // Find one client
  @ApiOperation({ summary: 'Get a client by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return a client by ID.',
    type: [ClienteDto],
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the client to retrieve',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ClienteDto> {
    return await this.clientsService.findOne(id);
  }

  // Get users of a client
  @ApiOperation({ summary: 'Get users of a client' })
  @ApiResponse({
    status: 200,
    description: 'List of users in the client',
    type: [UserDto],
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the client',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  @Get(':id/users')
  async getUsers(@Param('id') id: number): Promise<UserDto[]> {
    return await this.usersService.findByClientId(id);
  }

  // Create a client
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    description: 'The client has been successfully created.',
    type: ClienteDto,
  })
  @ApiBody({
    description: 'The client data to create a new client',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Tech Corp' },
      },
      required: ['name'],
    },
  })
  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<ClienteDto> {
    return await this.clientsService.create(createClientDto);
  }

  // Update a client
  @ApiOperation({ summary: 'Update a client' })
  @ApiResponse({
    status: 200,
    description: 'The client has been successfully updated.',
    type: ClienteDto,
  })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClienteDto> {
    return await this.clientsService.update(id, updateClientDto);
  }

  // Delete a client
  @ApiOperation({ summary: 'Delete a client' })
  @ApiResponse({
    status: 200,
    description: 'The client has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.clientsService.remove(id);
  }
}
