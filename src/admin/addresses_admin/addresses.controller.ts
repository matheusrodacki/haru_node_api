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
import { AddressesAdminService } from './addresses.service';
import { CreateAddressAdminDto } from './dto/create-address.dto';
import { UpdateAddressAdminDto } from './dto/update-address.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Addresses')
@Controller('addressesAdmin')
export class AddressesAdminController {
  constructor(private readonly addressesService: AddressesAdminService) {}

  // Create a new address
  @Post()
  @ApiOperation({ summary: 'Create a new address' })
  @ApiResponse({
    status: 201,
    description: 'The address has been successfully created.',
    type: CreateAddressAdminDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createAddressDto: CreateAddressAdminDto) {
    return this.addressesService.create(createAddressDto);
  }

  // Get all addresses
  @Get()
  @ApiOperation({ summary: 'Get all addresses' })
  @ApiResponse({
    status: 200,
    description: 'Return all addresses.',
    type: [CreateAddressAdminDto],
  })
  findAll() {
    return this.addressesService.findAll();
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
    type: CreateAddressAdminDto,
  })
  @ApiResponse({ status: 404, description: 'Address not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.addressesService.findOne(id);
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
    type: UpdateAddressAdminDto,
  })
  @ApiResponse({ status: 404, description: 'Address not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressAdminDto,
  ) {
    return this.addressesService.update(id, updateAddressDto);
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
    return this.addressesService.remove(id);
  }
}
