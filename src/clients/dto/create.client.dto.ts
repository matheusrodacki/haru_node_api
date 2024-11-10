// create-client.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  ValidateIf,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { CreateCompanyDto } from 'src/companies/dto/create-company.dto';
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
  @ValidateIf((o) => o.clientType === 'individual')
  @ValidateNested()
  @Type(() => CreateIndividualDto)
  @IsOptional()
  individual?: CreateIndividualDto;

  @ApiPropertyOptional({
    description: 'Company data',
    type: CreateCompanyDto,
    nullable: true,
  })
  @ValidateIf((o) => o.clientType === 'company')
  @ValidateNested()
  @Type(() => CreateCompanyDto)
  @IsOptional()
  company?: CreateCompanyDto;

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
