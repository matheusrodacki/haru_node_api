import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'src/clients/client.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  // Create a new address
  async create(
    createAddressDto: CreateAddressDto,
    clientId: number,
  ): Promise<Address> {
    const client = await this.clientRepository.findOne({
      where: { client_id: clientId },
    });
    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }

    const address = this.addressRepository.create({
      ...createAddressDto,
      client,
    });
    return await this.addressRepository.save(address);
  }

  // Get all addresses
  async findAll(): Promise<Address[]> {
    return await this.addressRepository.find();
  }

  // Get an address by ID
  async findOne(address_id: number): Promise<Address> {
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
    address_id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { address_id },
    });
    if (!address) {
      throw new NotFoundException(`Address with ID ${address_id} not found`);
    }
    Object.assign(address, updateAddressDto);
    return await this.addressRepository.save(address);
  }

  // Delete an address
  async remove(address_id: number): Promise<void> {
    const address = await this.addressRepository.findOne({
      where: { address_id },
    });
    if (!address) {
      throw new NotFoundException(`Address with ID ${address_id} not found`);
    }
    await this.addressRepository.remove(address);
  }
}
