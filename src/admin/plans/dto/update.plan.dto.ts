// create-organization.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Status } from 'src/enum/status.enum';

export class UpdatePlanDto {
  @ApiPropertyOptional({
    description: 'Plan name',
    example: 'Deluxe',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Plan price',
    example: 100.0,
  })
  @IsOptional()
  @IsNumber({}, { message: 'price must be a valid number' })
  @IsPositive()
  @Max(999999.99)
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'Plan expiration date',
    example: '2021-12-31',
  })
  @IsOptional()
  @IsDateString()
  expiration?: string;

  @ApiPropertyOptional({
    description: 'Plan status',
    enum: Status,
    example: 'active',
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
