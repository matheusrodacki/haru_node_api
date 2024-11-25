// create-contract.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
import { Status } from 'src/enum/status.enum';

export class CreateContractDto {
  @ApiProperty({
    description: 'Contracted price',
    example: 99.45,
  })
  @IsNumber({}, { message: 'price must be a valid number' })
  @IsPositive()
  @Max(999999.99)
  @Min(0)
  contracted_price: number;

  @ApiProperty({
    description: 'Contract date',
    example: '2024-08-01',
  })
  @IsNotEmpty()
  @IsDateString()
  contract_date: string;

  @ApiPropertyOptional({
    description: 'Contract status',
    enum: Status,
    example: 'active',
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({
    description: 'Client ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  client_id: number;

  @ApiProperty({
    description: 'Plan ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  plan_id: number;
}
