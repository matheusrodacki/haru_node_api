import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({ status: 201, description: 'User successfully authenticated.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @ApiBody({
    description: 'User login credentials',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'john.doe@example.com' },
        password: { type: 'string', example: 'yourpassword' },
      },
      required: ['email', 'password'],
    },
  })
  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string },
  ): Promise<{ accessToken: string }> {
    const accessToken = await this.usersService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    return { accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Protected route example' })
  @ApiResponse({
    status: 200,
    description: 'Access granted to protected route.',
  })
  @Post('protected')
  async protectedRoute(): Promise<string> {
    return 'You have accessed a protected route';
  }
}
