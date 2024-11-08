import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create.user.dto';
import { Organization } from 'src/organizations/organization.entity';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
    private jwtService: JwtService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['organization'] });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['organization'],
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, organizationId } = createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const org = await this.organizationsRepository.findOne({
      where: { id: organizationId },
    });

    if (!org) {
      throw new BadRequestException(
        'Cannot create a user without an organization',
      );
    }

    // Generate salt and hash password
    const user = new User();
    const passwordHash = await bcrypt.hash(password, 10);

    user.passwordHash = passwordHash;
    user.name = name;
    user.email = email;
    user.organization = org;
    return this.usersRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { userId: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['organization'],
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

    // Update organization if provided
    if (
      updateUserDto.organizationId &&
      updateUserDto.organizationId !== user.organization.id
    ) {
      const org = await this.organizationsRepository.findOne({
        where: { id: updateUserDto.organizationId },
      });
      if (!org) {
        throw new BadRequestException('Organization does not exist');
      }
      user.organization = org;
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
