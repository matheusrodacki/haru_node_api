import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePermissionDto {
  @ApiProperty({
    description: 'Permission role',
    example: 'user.create',
    required: false,
  })
  @IsOptional()
  @IsString()
  role?: string;
}
