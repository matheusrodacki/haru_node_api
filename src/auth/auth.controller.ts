import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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
}
