// create-organization.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';
import { ClientType } from 'src/enum/clientType.enum';
import { Status } from 'src/enum/status.enum';

export class UpdateClientDto {
  @ApiPropertyOptional({
    description: 'Client type',
    enum: ClientType,
  })
  @IsEnum(ClientType)
  clientType?: ClientType;

  @ApiPropertyOptional({
    description: 'Client status',
    enum: Status,
  })
  @IsEnum(Status)
  status?: Status;

  @ApiPropertyOptional({
    description: 'Client notes',
    example: 'Some notes about the client',
  })
  @IsString()
  notes?: string;
}
