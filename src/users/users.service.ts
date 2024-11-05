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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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

  async create(user: User): Promise<User> {
    if (!user.organization) {
      throw new BadRequestException(
        'Cannot create a user without an organization',
      );
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(user.passwordHash, salt);

    user.salt = salt;
    user.passwordHash = passwordHash;
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
