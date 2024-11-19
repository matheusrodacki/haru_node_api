// create-client.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  ValidateIf,
  ValidateNested,
  IsOptional,
  IsNotEmptyObject,
} from 'class-validator';
import { CreateAddressDto } from 'src/admin/addresses_admin/dto/create-address.dto';
import { CreateCompanyDto } from 'src/admin/companies/dto/create-company.dto';
import { CreateIndividualDto } from 'src/admin/individuals/dto/create-individual.dto';
import { ClientType } from 'src/enum/clientType.enum';
import { Status } from 'src/enum/status.enum';

export class CreateClientDto {
  @ApiProperty({
    description: 'Client type',
    enum: ClientType,
  })
  @IsEnum(ClientType)
  client_type: ClientType;

  @ApiPropertyOptional({
    description: 'Individual data',
    type: CreateIndividualDto,
    nullable: true,
  })
  @ValidateIf((o) => o.client_type === 'individual')
  @ValidateNested()
  @Type(() => CreateIndividualDto)
  @IsOptional()
  individual?: CreateIndividualDto;

  @ApiPropertyOptional({
    description: 'Company data',
    type: CreateCompanyDto,
    nullable: true,
  })
  @ValidateIf((o) => o.client_type === 'company')
  @ValidateNested()
  @Type(() => CreateCompanyDto)
  @IsOptional()
  company?: CreateCompanyDto;

  @ApiProperty({
    description: 'Client address',
    type: CreateAddressDto,
  })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsNotEmptyObject()
  address: CreateAddressDto;

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
