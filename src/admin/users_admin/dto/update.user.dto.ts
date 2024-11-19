import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { UpdateAddressAdminDto } from 'src/admin/addresses_admin/dto/update-address.dto';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'User password',
    example: 'newPassword123',
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    description: 'User phone number',
    example: '1234567890',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'User address',
    required: false,
    type: UpdateAddressAdminDto,
  })
  @IsOptional()
  address?: UpdateAddressAdminDto;

  @ApiProperty({
    description: 'User role',
    example: 'operator',
    required: false,
  })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ description: 'User status', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  status?: number;
}
