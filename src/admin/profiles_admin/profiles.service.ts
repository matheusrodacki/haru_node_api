import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { Permission } from '../permissions_admin/permissions.entity';
import { CreateProfileDto } from './dto/create.profile.dto';
import { UpdateProfileDto } from './dto/update.profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const { name, permissions } = createProfileDto;

    const existingProfile = await this.profilesRepository.findOne({
      where: { name },
    });
    if (existingProfile) {
      throw new BadRequestException('Profile name is already in use');
    }

    const profile = this.profilesRepository.create({ name });

    if (permissions && permissions.length > 0) {
      const permissionsEntities = await this.permissionsRepository.find({
        where: permissions.map((role) => ({ role })),
      });

      if (permissionsEntities.length !== permissions.length) {
        throw new BadRequestException('One or more permissions are invalid');
      }

      profile.permissions = permissionsEntities;
    }

    return this.profilesRepository.save(profile);
  }

  async findAll(): Promise<Profile[]> {
    return this.profilesRepository.find({ relations: ['permissions'] });
  }

  async findOne(profile_id: number): Promise<Profile> {
    const profile = await this.profilesRepository.findOne({
      where: { profile_id },
      relations: ['permissions'],
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.findOne(id);

    if (updateProfileDto.name) {
      profile.name = updateProfileDto.name;
    }

    if (updateProfileDto.permissions) {
      const permissionsEntities = await this.permissionsRepository.find({
        where: updateProfileDto.permissions.map((role) => ({ role })),
      });

      if (permissionsEntities.length !== updateProfileDto.permissions.length) {
        throw new BadRequestException('One or more permissions are invalid');
      }

      profile.permissions = permissionsEntities;
    }

    return this.profilesRepository.save(profile);
  }

  async remove(id: number): Promise<void> {
    const profile = await this.findOne(id);
    await this.profilesRepository.softRemove(profile);
  }
}
