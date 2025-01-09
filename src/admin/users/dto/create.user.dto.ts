// create-user.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  ValidateNested,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { CreateAddressAdminDto } from 'src/admin/addresses_admin/dto/create-address.dto';
import { Status } from 'src/enum/status.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsString()
  last_name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'yourpassword',
    description: 'User password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '1234567890',
    description: 'User phone number',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'User address',
    type: CreateAddressAdminDto,
  })
  @ValidateNested()
  @Type(() => CreateAddressAdminDto)
  address?: CreateAddressAdminDto;

  @ApiProperty({
    example: '1',
    description: 'User profile id',
  })
  @IsNumber()
  profile_id: number;

  @ApiProperty({
    example: '1',
    description: 'User client id',
  })
  @IsNumber()
  client_id?: number;

  @ApiPropertyOptional({
    description: 'User status',
    enum: Status,
  })
  @IsEnum(Status)
  status?: Status;
}
