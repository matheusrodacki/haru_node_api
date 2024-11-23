import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Status } from 'src/enum/status.enum';

export class CreatePlanDto {
  @ApiProperty({
    description: 'Plan name',
    example: 'Deluxe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Plan price',
    example: 99.49,
  })
  @IsNotEmpty()
  @IsNumber({}, { message: 'price must be a valid number' })
  @IsPositive()
  @Max(999999.99)
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    description: 'Plan expiration date',
    example: '2027-12-31',
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
