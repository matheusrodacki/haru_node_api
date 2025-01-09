import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { AddressAdminDto } from 'src/admin/addresses_admin/dto/adress.dto';
import { Status } from 'src/enum/status.enum';

export class UserDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  user_id: number;

  @ApiProperty({ description: 'User  first name', example: 'John' })
  first_name: string;

  @ApiProperty({ description: 'User last name', example: 'Doe' })
  last_name: string;

  @ApiProperty({ description: 'User email', example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ description: 'User phone number', example: '1234567890' })
  phone: string;

  @ApiProperty({ description: 'User address', type: AddressAdminDto })
  address?: AddressAdminDto;

  @ApiPropertyOptional({
    example: '1',
    description: 'User profile id',
  })
  profile_id?: number;

  @ApiPropertyOptional({
    example: '1',
    description: 'User profile id',
  })
  client_id?: number;

  @ApiProperty({
    description: 'User status',
    enum: Status,
  })
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({
    description: 'Creation date',
    example: '2023-10-01T12:00:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2023-10-02T15:30:00Z',
  })
  updated_at: Date;
}
