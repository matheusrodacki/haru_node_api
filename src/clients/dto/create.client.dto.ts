// create-client.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ClientType } from 'src/enum/clientType.enum';
import { Status } from 'src/enum/status.enum';

export class CreateClientDto {
  @ApiProperty({
    description: 'Client type',
    enum: ClientType,
  })
  @IsEnum(ClientType)
  clientType: ClientType;

  @ApiProperty({
    description: 'Client status',
    enum: Status,
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    description: 'Client notes',
    example: 'Some notes about the client',
  })
  @IsString()
  @IsNotEmpty()
  notes: string;
}
