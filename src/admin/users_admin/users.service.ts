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
import { Client } from '../clients/client.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
    private jwtService: JwtService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['client'] });
  }

  findOne(user_id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { user_id },
      relations: ['client'],
    });
  }

  async findByClientId(client_id: number): Promise<User[]> {
    const client = await this.clientsRepository.findOne({
      where: { client_id },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.client', 'client')
      .where('client.client_id = :client_id', { client_id });

    const users = await queryBuilder.getMany();

    return users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['client'],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { first_name, last_name, email, password, phone, role, clientId } =
      createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const client = await this.clientsRepository.findOne({
      where: { client_id: clientId },
    });

    if (!client) {
      throw new BadRequestException('Cannot create a user without a client');
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
    user.client = client;
    return this.usersRepository.save(user);
  }

  async update(user_id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { user_id },
      relations: ['client'],
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

    // Update client if provided
    if (
      updateUserDto.clientId &&
      updateUserDto.clientId !== user.client.client_id
    ) {
      const client = await this.clientsRepository.findOne({
        where: { client_id: updateUserDto.clientId },
      });
      if (!client) {
        throw new BadRequestException('Client does not exist');
      }
      user.client = client;
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
