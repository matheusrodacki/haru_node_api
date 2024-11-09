// create-client.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';
import { ClientType } from 'src/enum/clientType.enum';
import { Status } from 'src/enum/status.enum';
import { CreateIndividualDto } from 'src/individuals/dto/create-individual.dto';

export class CreateClientDto {
  @ApiProperty({
    description: 'Client type',
    enum: ClientType,
  })
  @IsEnum(ClientType)
  clientType: ClientType;

  @ApiPropertyOptional({
    description: 'Individual data',
    type: CreateIndividualDto,
    nullable: true,
  })
  individual?: CreateIndividualDto;

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
