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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Profile } from './profile.entity';
import { ProfileDto } from './dto/profile.dto';
import { plainToClass } from 'class-transformer';
import { PermissionsGuard } from 'src/roles/permissions.guard';
import { Permissions } from 'src/roles/permissions.decorator';

@ApiTags('Profiles')
@Controller('profiles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new profile' })
  @ApiResponse({
    status: 201,
    description: 'Profile created successfully',
    type: Profile,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Permissions('profile.create')
  async create(
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<ProfileDto> {
    const profile = await this.profilesService.create(createProfileDto);
    const permissions = profile.permissions.map((perm) => perm.role);

    const profileDto = plainToClass(
      ProfileDto,
      { ...profile, permissions },
      { excludeExtraneousValues: true },
    );

    return profileDto;
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all profiles' })
  @ApiResponse({
    status: 200,
    description: 'List of profiles',
    type: [ProfileDto],
  })
  @Permissions('profile.read')
  async findAll(): Promise<ProfileDto[]> {
    const profiles = await this.profilesService.findAll();

    const profilesDto = profiles.map((profile) => {
      const permissions = profile.permissions.map((perm) => perm.role);
      return plainToClass(
        ProfileDto,
        { ...profile, permissions },
        { excludeExtraneousValues: true },
      );
    });

    return profilesDto;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a profile by ID' })
  @ApiResponse({ status: 200, description: 'Profile data', type: ProfileDto })
  @Permissions('profile.read')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProfileDto> {
    const profile = await this.profilesService.findOne(id);
    const permissions = profile.permissions.map((perm) => perm.role);

    const profileDto = plainToClass(
      ProfileDto,
      { ...profile, permissions },
      { excludeExtraneousValues: true },
    );

    return profileDto;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: Profile,
  })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @Permissions('profile.update')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileDto> {
    const profile = await this.profilesService.update(id, updateProfileDto);
    const permissions = profile.permissions.map((perm) => perm.role);

    const profileDto = plainToClass(
      ProfileDto,
      { ...profile, permissions },
      { excludeExtraneousValues: true },
    );

    return profileDto;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a profile' })
  @ApiResponse({ status: 200, description: 'Profile deleted successfully' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  @Permissions('profile.delete')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.profilesService.remove(id);
  }
}
