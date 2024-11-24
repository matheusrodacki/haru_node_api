// create.profile.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { CreatePermissionDto } from 'src/admin/permissions_admin/dto/create.permission.dto';

export class CreateProfileDto {
  @ApiProperty({ example: 'Admin', description: 'Nome do perfil' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Permissões do perfil',
    type: [CreatePermissionDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePermissionDto)
  permissions?: CreatePermissionDto[];
}
