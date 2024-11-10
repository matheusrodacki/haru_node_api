// create-organization.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { CreateCompanyDto } from 'src/companies/dto/create-company.dto';
import { ClientType } from 'src/enum/clientType.enum';
import { Status } from 'src/enum/status.enum';
import { CreateIndividualDto } from 'src/individuals/dto/create-individual.dto';

export class UpdateClientDto {
  @ApiPropertyOptional({
    description: 'Client type',
    enum: ClientType,
  })
  @IsOptional()
  @IsEnum(ClientType)
  clientType?: ClientType;

  @ApiPropertyOptional({
    description: 'Individual data',
    type: CreateIndividualDto,
    nullable: true,
  })
  @IsOptional()
  individual?: CreateIndividualDto;

  @ApiPropertyOptional({
    description: 'Company data',
    type: CreateCompanyDto,
    nullable: true,
  })
  @IsOptional()
  company?: CreateCompanyDto;

  @ApiPropertyOptional({
    description: 'Client status',
    enum: Status,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiPropertyOptional({
    description: 'Client notes',
    example: 'Some notes about the client',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
