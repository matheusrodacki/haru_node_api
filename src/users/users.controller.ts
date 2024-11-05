import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'Return a user by ID.' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Cannot create a user without an organization.',
  })
  @ApiBody({
    description: 'The user data to create a new user',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john.doe@example.com' },
        organization: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
          },
          required: ['id'],
        },
      },
      required: ['name', 'email', 'organization'],
    },
  })
  @Post()
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }
}
