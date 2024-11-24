// create.permission.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ example: 'Crete User', description: 'Permission name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'user.create', description: 'Permission role' })
  @IsString()
  role: string;
}
