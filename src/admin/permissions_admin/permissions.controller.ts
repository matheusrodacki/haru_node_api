import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create.permission.dto';
import { UpdatePermissionDto } from './dto/update.permission.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Permission } from './permissions.entity';
import { Permissions } from 'src/roles/permissions.decorator';
import { PermissionsGuard } from 'src/roles/permissions.gaurd';
import { PermissionDto } from './dto/permission.dto';

@ApiTags('Permissions')
@Controller('permissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new permission' })
  @ApiResponse({
    status: 201,
    description: 'Permission created successfully',
    type: CreatePermissionDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Permissions('permission.create')
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all permissions' })
  @ApiResponse({
    status: 200,
    description: 'List of permissions',
    type: [PermissionDto],
  })
  @Permissions('permission.read')
  async findAll(): Promise<PermissionDto[]> {
    return await this.permissionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a permission by ID' })
  @ApiResponse({
    status: 200,
    description: 'Permission data',
    type: PermissionDto,
  })
  @Permissions('permission.read')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PermissionDto> {
    return await this.permissionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a permission' })
  @ApiResponse({
    status: 200,
    description: 'Permission updated successfully',
    type: Permission,
  })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  @Permissions('permission.update')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a permission' })
  @ApiResponse({ status: 200, description: 'Permission deleted successfully' })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  @Permissions('permission.delete')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.permissionsService.remove(id);
  }
}
