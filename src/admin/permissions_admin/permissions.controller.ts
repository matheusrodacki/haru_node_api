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
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { ClientsRoles } from 'src/roles/clientsRoles.enum';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Permission } from './permissions.entity';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ApiOperation({ summary: 'Create a new permission' })
  @ApiResponse({
    status: 201,
    description: 'Permission created successfully',
    type: Permission,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionsService.create(createPermissionDto);
  }

  @ApiOperation({ summary: 'Retrieve all permissions' })
  @ApiResponse({
    status: 200,
    description: 'List of permissions',
    type: [Permission],
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ClientsRoles.SUPERADMIN, ClientsRoles.ADMIN)
  @Get()
  async findAll(): Promise<Permission[]> {
    return await this.permissionsService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a permission by ID' })
  @ApiResponse({
    status: 200,
    description: 'Permission data',
    type: Permission,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ClientsRoles.SUPERADMIN, ClientsRoles.ADMIN)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Permission> {
    return await this.permissionsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a permission' })
  @ApiResponse({
    status: 200,
    description: 'Permission updated successfully',
    type: Permission,
  })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ClientsRoles.SUPERADMIN, ClientsRoles.ADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionsService.update(id, updatePermissionDto);
  }

  @ApiOperation({ summary: 'Delete a permission' })
  @ApiResponse({ status: 200, description: 'Permission deleted successfully' })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ClientsRoles.SUPERADMIN, ClientsRoles.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.permissionsService.remove(id);
  }
}
