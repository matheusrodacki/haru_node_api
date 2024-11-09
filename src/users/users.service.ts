import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { Client } from 'src/clients/client.entity';

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

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['client'],
    });
  }

  async findByClientId(clientId: number): Promise<User[]> {
    const client = await this.clientsRepository.findOne({
      where: { client_id: clientId },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.client', 'client')
      .where('client.id = :clientId', { clientId });

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
    const { name, email, password, role, clientId } = createUserDto;

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
    user.name = name;
    user.email = email;
    user.role = role;
    user.client = client;
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['client'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
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

    // Update name if provided
    if (updateUserDto.name !== undefined) {
      user.name = updateUserDto.name;
    }

    // Update status if provided
    if (updateUserDto.status !== undefined) {
      user.status = updateUserDto.status;
    }

    // Save the updated user
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.remove(user);
  }
}
