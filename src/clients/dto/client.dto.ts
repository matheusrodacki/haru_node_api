// create-client.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ClienteDto {
  @ApiProperty({ description: 'Client ID', example: 1 })
  client_id: number;

  @ApiProperty({ description: 'Client name', example: 'Tech Corp' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Client status', example: 1 })
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
