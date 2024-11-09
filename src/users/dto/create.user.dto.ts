// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'yourpassword',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'admin',
    description: 'User role',
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the organization the user belongs to',
  })
  @IsNumber()
  @IsNotEmpty()
  organizationId: number;
}
