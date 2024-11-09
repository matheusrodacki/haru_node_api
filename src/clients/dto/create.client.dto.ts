// create-client.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'Tech Corp', description: 'Client name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
