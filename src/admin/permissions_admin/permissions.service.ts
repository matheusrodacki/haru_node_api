import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permissions.entity';
import { CreatePermissionDto } from './dto/create.permission.dto';
import { UpdatePermissionDto } from './dto/update.permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const { role } = createPermissionDto;

    const existingPermission = await this.permissionsRepository.findOne({
      where: { role },
    });
    if (existingPermission) {
      throw new BadRequestException('Permission name is already in use');
    }

    const permission = this.permissionsRepository.create({ role });
    return this.permissionsRepository.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionsRepository.find();
  }

  async findOne(permission_id: number): Promise<Permission> {
    const permission = await this.permissionsRepository.findOne({
      where: { permission_id },
    });

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return permission;
  }

  //find permission by role
  async findByRole(role: string): Promise<Permission> {
    return await this.permissionsRepository.findOne({
      where: { role },
    });
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    const permission = await this.findOne(id);

    if (updatePermissionDto.role) {
      permission.role = updatePermissionDto.role;
    }

    return this.permissionsRepository.save(permission);
  }

  async remove(id: number): Promise<void> {
    const permission = await this.findOne(id);
    await this.permissionsRepository.softRemove(permission);
  }
}
