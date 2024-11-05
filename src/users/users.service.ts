import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './create-user.dto';
import { Organization } from 'src/organizations/organization.entity';

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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, organization } = createUserDto;

    const org = await this.organizationsRepository.findOne({
      where: { id: organization.id },
    });

    if (!org) {
      throw new BadRequestException(
        'Cannot create a user without an organization',
      );
    }

    // Generate salt and hash password
    const user = new User();
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.salt = salt;
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
}
