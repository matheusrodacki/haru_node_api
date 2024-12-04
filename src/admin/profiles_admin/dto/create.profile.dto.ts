// create.profile.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ example: 'Admin', description: 'Nome do perfil' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Permissões do perfil',
    example: ['user.create', 'user.read', 'user.delete'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];
}
