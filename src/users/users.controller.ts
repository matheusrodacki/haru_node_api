// users/users.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  Put,
  Delete,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create.user.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enum/roles.enum';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Find all users
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [UserDto] })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.OPERATOR)
  @Get()
  async findAll(@Req() req: any): Promise<UserDto[]> {
    const user = req.user;
    if (user.role === Role.SUPERADMIN) {
      return await this.usersService.findAll();
    } else if (user.role === Role.ADMIN) {
      return await this.usersService.findByClientId(user.clientId);
    } else if (user.role === Role.OPERATOR) {
      return [await this.usersService.findOne(user.user_id)];
    } else {
      throw new ForbiddenException('Access denied');
    }
  }

  //Find one user
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiResponse({ status: 200, description: 'User data', type: UserDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OPERATOR)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return await this.usersService.findOne(id);
  }

  //Create a new user
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }

  //Update a user
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OPERATOR)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.usersService.update(id, updateUserDto);
    return user;
  }

  //Delete a user
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.remove(id);
  }
}
