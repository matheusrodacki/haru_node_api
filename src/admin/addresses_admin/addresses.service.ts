import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressAdminDto } from './dto/create-address.dto';
import { UpdateAddressAdminDto } from './dto/update-address.dto';
import { AddressAdmin } from './address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../clients/client.entity';

@Injectable()
export class AddressesAdminService {
  constructor(
    @InjectRepository(AddressAdmin)
    private addressRepository: Repository<AddressAdmin>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  // Create a new address
  async create(createAddressDto: CreateAddressAdminDto): Promise<AddressAdmin> {
    const address = this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(address);
  }

  // Get all addresses
  async findAll(): Promise<AddressAdmin[]> {
    return await this.addressRepository.find();
  }

  // Get an address by ID
  async findOne(user_id: number): Promise<AddressAdmin> {
    const address = await this.addressRepository.findOne({
      where: { user_id },
    });
    if (!address) {
      throw new NotFoundException(`Address with ID ${user_id} not found`);
    }
    return address;
  }

  // Update an address
  async update(
    user_id: number,
    updateAddressDto: UpdateAddressAdminDto,
  ): Promise<AddressAdmin> {
    const address = await this.addressRepository.findOne({
      where: { user_id },
    });
    if (!address) {
      throw new NotFoundException(`Address with ID ${user_id} not found`);
    }
    Object.assign(address, updateAddressDto);
    return await this.addressRepository.save(address);
  }

  // Delete an address
  async remove(user_id: number): Promise<void> {
    const address = await this.addressRepository.findOne({
      where: { user_id },
    });
    if (!address) {
      throw new NotFoundException(`Address with ID ${user_id} not found`);
    }
    await this.addressRepository.remove(address);
  }
}
