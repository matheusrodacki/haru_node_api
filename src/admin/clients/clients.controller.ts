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
import { ClientsService } from './clients.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClienteDto } from './dto/client.dto';
import { CreateClientDto } from './dto/create.client.dto';
import { UpdateClientDto } from './dto/update.client.dto';
import { PermissionsGuard } from 'src/roles/permissions.guard';
import { Permissions } from 'src/roles/permissions.decorator';

@ApiTags('Clients')
@Controller('clients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  // Create a client
  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({
    status: 201,
    description: 'The client has been successfully created.',
    type: ClienteDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Permissions('client.create')
  async create(@Body() createClientDto: CreateClientDto): Promise<ClienteDto> {
    return await this.clientsService.create(createClientDto);
  }

  // Find all clients
  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({
    status: 200,
    description: 'Return all clients.',
    type: ClienteDto,
  })
  @Permissions('client.read')
  async findAll(): Promise<ClienteDto[]> {
    return await this.clientsService.findAll();
  }

  // Find one client
  @Get(':id')
  @ApiOperation({ summary: 'Get a client by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the client to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Return a client by ID.',
    type: [ClienteDto],
  })
  @Permissions('client.read')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ClienteDto> {
    return await this.clientsService.findOne(id);
  }

  // Update a client
  @Put(':id')
  @ApiOperation({ summary: 'Update a client' })
  @ApiParam({
    name: 'id',
    description: 'ID of the client',
  })
  @ApiResponse({
    status: 200,
    description: 'The client has been successfully updated.',
    type: ClienteDto,
  })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @Permissions('client.update')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClienteDto> {
    return await this.clientsService.update(id, updateClientDto);
  }

  // Delete a client
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a client' })
  @ApiParam({
    name: 'id',
    description: 'ID of the client',
  })
  @ApiResponse({
    status: 200,
    description: 'The client has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @Permissions('client.delete')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.clientsService.remove(id);
  }
}
