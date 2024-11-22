// create-organization.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsDateString,
  IsDecimal,
  IsInt,
  IsOptional,
} from 'class-validator';
import { Status } from 'src/enum/status.enum';

export class UpdateContractDto {
  @ApiPropertyOptional({
    description: 'Contracted price',
    example: 100,
  })
  @IsOptional()
  @IsDecimal()
  contracted_price?: number;

  @ApiPropertyOptional({
    description: 'Contract date',
    example: '2023-10-01',
  })
  @IsOptional()
  @IsDateString()
  contract_date?: string;

  @ApiPropertyOptional({
    description: 'Contract status',
    enum: Status,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiPropertyOptional({
    description: 'Client ID',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  client_id?: number;

  @ApiPropertyOptional({
    description: 'Plan ID',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  plan_id?: number;
}
