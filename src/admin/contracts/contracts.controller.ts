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
import { ContractsService } from './contracts.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ContractDto } from './dto/contract.dto';
import { CreateContractDto } from './dto/create.contract.dto';
import { UpdateContractDto } from './dto/update.contract.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { ClientsRoles } from 'src/roles/clientsRoles.enum';
import { Roles } from 'src/roles/roles.decorator';

@ApiTags('Contracts')
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  // Create a contract
  @Post()
  @ApiOperation({ summary: 'Create a new contract' })
  @ApiResponse({
    status: 201,
    description: 'The contract has been successfully created.',
    type: ContractDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ClientsRoles.SUPERADMIN)
  async create(
    @Body() createContractDto: CreateContractDto,
  ): Promise<ContractDto> {
    return await this.contractsService.create(createContractDto);
  }

  // Find all contracts
  @Get()
  @ApiOperation({ summary: 'Get all contracts' })
  @ApiResponse({
    status: 200,
    description: 'Return all contracts.',
    type: ContractDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ClientsRoles.SUPERADMIN)
  async findAll(): Promise<ContractDto[]> {
    return await this.contractsService.findAll();
  }

  // Find contracts by client ID
  @Get('client/:client_id')
  @ApiOperation({ summary: 'Get contracts by client ID' })
  @ApiParam({ name: 'client_id', type: Number, description: 'Client ID' })
  @ApiResponse({
    status: 200,
    description: 'List of contracts',
    type: [ContractDto],
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ClientsRoles.SUPERADMIN)
  async findByClientId(@Param('client_id', ParseIntPipe) client_id: number) {
    return this.contractsService.findByClientId(client_id);
  }

  // Find one contract
  @Get(':id')
  @ApiOperation({ summary: 'Get a contract by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the contract to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Return a contract by ID.',
    type: [ContractDto],
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ClientsRoles.SUPERADMIN)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ContractDto> {
    return await this.contractsService.findOne(id);
  }

  // Update a contract
  @Put(':id')
  @ApiOperation({ summary: 'Update a contract' })
  @ApiParam({
    name: 'id',
    description: 'ID of the contract',
  })
  @ApiResponse({
    status: 200,
    description: 'The contract has been successfully updated.',
    type: ContractDto,
  })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ClientsRoles.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContractDto: UpdateContractDto,
  ): Promise<ContractDto> {
    return await this.contractsService.update(id, updateContractDto);
  }

  // Delete a contract
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contract' })
  @ApiParam({
    name: 'id',
    description: 'ID of the contract',
  })
  @ApiResponse({
    status: 200,
    description: 'The contract has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ClientsRoles.SUPERADMIN)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.contractsService.remove(id);
  }
}
