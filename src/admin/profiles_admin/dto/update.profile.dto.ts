import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdatePermissionDto } from 'src/admin/permissions_admin/dto/update.permission.dto';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Profile name',
    example: 'Admin',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Profile permissions',
    type: [UpdatePermissionDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePermissionDto)
  permissions?: UpdatePermissionDto[];
}
