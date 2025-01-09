import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressClientDto } from './dto/create-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AddressClient } from './address.entity';
import { UpdateAddressClientDto } from './dto/update-address.dto';

@Injectable()
export class AddressesClientService {
  constructor(
    @InjectRepository(AddressClient)
    private addressRepository: Repository<AddressClient>,
  ) {}

  // Create a new address
  async create(
    createAddressClientDto: CreateAddressClientDto,
    connection: DataSource,
  ): Promise<AddressClient> {
    const addressRepository = connection.getRepository(AddressClient);
    const addressClient = addressRepository.create(createAddressClientDto);
    return await addressRepository.save(addressClient);
  }

  // Get all addresses
  async findAll(connection: DataSource): Promise<AddressClient[]> {
    const addressRepository = connection.getRepository(AddressClient);
    return await addressRepository.find();
  }

  // Get an address by ID
  async findOne(address_id: number): Promise<AddressClient> {
    const address = await this.addressRepository.findOne({
      where: { address_id },
    });
    if (!address) {
      throw new NotFoundException(`Address with ID ${address_id} not found`);
    }
    return address;
  }

  // Update an address
  async update(
    updateAddressClientDto: UpdateAddressClientDto,
  ): Promise<AddressClient> {
    return await this.addressRepository.save(updateAddressClientDto);
  }

  // Delete an address
  async remove(address_id: number): Promise<void> {
    const addressClient = await this.addressRepository.findOne({
      where: { address_id },
    });
    if (!addressClient) {
      throw new NotFoundException(`Address with ID ${address_id} not found`);
    }
    await this.addressRepository.softRemove(addressClient);
  }
}
