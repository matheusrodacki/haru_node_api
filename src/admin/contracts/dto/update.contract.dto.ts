// create-organization.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsDateString,
  IsOptional,
  IsPositive,
  Max,
  Min,
  IsNumber,
} from 'class-validator';
import { Status } from 'src/enum/status.enum';

export class UpdateContractDto {
  @ApiPropertyOptional({
    description: 'Contracted price',
    example: 100,
  })
  @IsOptional()
  @IsPositive()
  @Max(999999.99)
  @Min(0)
  contracted_price?: number;

  @ApiPropertyOptional({
    description: 'Contract date',
    example: '2024-08-01',
  })
  @IsOptional()
  @IsDateString()
  contract_date?: string;

  @ApiPropertyOptional({
    description: 'Contract status',
    enum: Status,
    example: 'active',
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiPropertyOptional({
    description: 'Client ID',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  client_id?: number;

  @ApiPropertyOptional({
    description: 'Plan ID',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  plan_id?: number;
}
