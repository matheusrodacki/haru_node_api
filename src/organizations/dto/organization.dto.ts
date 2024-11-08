// create-organization.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class OrganizationDto {
  @ApiProperty({ description: 'Organization ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Organization name', example: 'Tech Corp' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Organization status', example: 1 })
  status: number;

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
