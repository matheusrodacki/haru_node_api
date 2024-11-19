import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './user.entity';
import { AddressAdmin } from '../addresses_admin/address.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(AddressAdmin)
    private addressesRepository: Repository<AddressAdmin>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { first_name, last_name, email, password, address, phone, role } =
      createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    // Generate salt and hash password
    const user = new User();
    const passwordHash = await bcrypt.hash(password, 10);

    user.passwordHash = passwordHash;
    user.first_name = first_name;
    user.last_name = last_name;
    user.email = email;
    user.phone = phone;
    user.role = role;
    Object.assign(user.address, address);

    return await this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(user_id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { user_id },
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async update(user_id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { user_id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    // Update email if provided and not already in use
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser) {
        throw new BadRequestException('Email is already in use');
      }
      user.email = updateUserDto.email;
    }

    // Update password if provided
    if (updateUserDto.password) {
      user.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Update first name if provided
    if (updateUserDto.first_name !== undefined) {
      user.first_name = updateUserDto.first_name;
    }

    // Update last name if provided
    if (updateUserDto.last_name !== undefined) {
      user.last_name = updateUserDto.last_name;
    }

    // Update status if provided
    if (updateUserDto.status !== undefined) {
      user.status = updateUserDto.status;
    }

    // Update phone if provided
    if (updateUserDto.phone !== undefined) {
      user.phone = updateUserDto.phone;
    }

    // Update role if provided
    if (updateUserDto.role !== undefined) {
      user.role = updateUserDto.role;
    }

    // Update address if provided
    if (updateUserDto.address) {
      Object.assign(user.address, updateUserDto.address);
    }

    // Save the updated user
    return this.usersRepository.save(user);
  }

  async remove(user_id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    await this.usersRepository.remove(user);
  }
}
