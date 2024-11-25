import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';

import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddressesClientService } from './addresses.service';
import { CreateAddressClientDto } from './dto/create-address.dto';
import { UpdateAddressClientDto } from './dto/update-address.dto';

@ApiTags('Addresses - Client')
@Controller('addressesClient')
export class AddressesClientController {
  constructor(
    private readonly addressesClientService: AddressesClientService,
  ) {}

  // Create a new address
  @Post()
  @ApiOperation({ summary: 'Create a new address' })
  @ApiResponse({
    status: 201,
    description: 'The address has been successfully created.',
    type: CreateAddressClientDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createAddressClientDto: CreateAddressClientDto) {
    return this.addressesClientService.create(createAddressClientDto);
  }

  // Get all addresses
  @Get()
  @ApiOperation({ summary: 'Get all addresses' })
  @ApiResponse({
    status: 200,
    description: 'Return all addresses.',
    type: [CreateAddressClientDto],
  })
  findAll() {
    return this.addressesClientService.findAll();
  }

  // Get an address by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get an address by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the address to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Return an address by ID.',
    type: CreateAddressClientDto,
  })
  @ApiResponse({ status: 404, description: 'Address not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.addressesClientService.findOne(id);
  }

  // Update an address
  @Put(':id')
  @ApiOperation({ summary: 'Update an address' })
  @ApiParam({
    name: 'id',
    description: 'ID of the address',
  })
  @ApiResponse({
    status: 200,
    description: 'The address has been successfully updated.',
    type: UpdateAddressClientDto,
  })
  @ApiResponse({ status: 404, description: 'Address not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressClientDto: UpdateAddressClientDto,
  ) {
    return this.addressesClientService.update(updateAddressClientDto);
  }

  // Delete an address
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an address' })
  @ApiParam({
    name: 'id',
    description: 'ID of the address',
  })
  @ApiResponse({
    status: 200,
    description: 'The address has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Address not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.addressesClientService.remove(id);
  }
}
