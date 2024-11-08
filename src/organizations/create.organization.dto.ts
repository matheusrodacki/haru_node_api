// create-organization.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({ example: 'Tech Corp', description: 'Organization name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
