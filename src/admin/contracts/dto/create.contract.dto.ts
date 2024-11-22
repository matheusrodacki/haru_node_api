// create-contract.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsDecimal, IsEnum, IsInt } from 'class-validator';
import { Status } from 'src/enum/status.enum';

export class CreateContractDto {
  @ApiPropertyOptional({
    description: 'Contracted price',
    example: 100,
  })
  @IsDecimal()
  contracted_price: number;

  @ApiPropertyOptional({
    description: 'Contract date',
    example: '2023-10-01',
  })
  @IsDateString()
  contract_date: string;

  @ApiPropertyOptional({
    description: 'Contract status',
    enum: Status,
  })
  @IsEnum(Status)
  status?: Status;

  @ApiPropertyOptional({
    description: 'Client ID',
    example: 1,
  })
  @IsInt()
  client: number;

  @ApiPropertyOptional({
    description: 'Plan ID',
    example: 1,
  })
  @IsInt()
  plan: number;
}
