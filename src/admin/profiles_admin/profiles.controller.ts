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
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create.profile.dto';
import { UpdateProfileDto } from './dto/update.profile.dto';
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
import { Profile } from './profile.entity';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @ApiOperation({ summary: 'Create a new profile' })
  @ApiResponse({
    status: 201,
    description: 'Profile created successfully',
    type: Profile,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return await this.profilesService.create(createProfileDto);
  }

  @ApiOperation({ summary: 'Retrieve all profiles' })
  @ApiResponse({
    status: 200,
    description: 'List of profiles',
    type: [Profile],
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ClientsRoles.SUPERADMIN, ClientsRoles.ADMIN)
  @Get()
  async findAll(): Promise<Profile[]> {
    return await this.profilesService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a profile by ID' })
  @ApiResponse({ status: 200, description: 'Profile data', type: Profile })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ClientsRoles.SUPERADMIN, ClientsRoles.ADMIN)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Profile> {
    return await this.profilesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: Profile,
  })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ClientsRoles.SUPERADMIN, ClientsRoles.ADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return await this.profilesService.update(id, updateProfileDto);
  }

  @ApiOperation({ summary: 'Delete a profile' })
  @ApiResponse({ status: 200, description: 'Profile deleted successfully' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ClientsRoles.SUPERADMIN, ClientsRoles.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.profilesService.remove(id);
  }
}
