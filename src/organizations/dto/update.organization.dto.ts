// create-organization.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateOrganizationDto {
  @ApiProperty({
    description: 'Organization name',
    example: 'Tech Corp',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Organization status',
    example: 1,
    required: false,
  })
  @IsInt()
  @IsOptional()
  status: number;
}
