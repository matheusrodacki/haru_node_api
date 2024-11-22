// create-client.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum } from 'class-validator';
import { Status } from 'src/enum/status.enum';

export class PlanDto {
  @ApiPropertyOptional({
    description: 'Plan id',
    example: 1,
  })
  plan_id: number;

  @ApiPropertyOptional({
    description: 'Plan name',
    example: 'Plan name',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Plan price',
    example: 100.0,
  })
  price: number;

  @ApiPropertyOptional({
    description: 'Plan expiration date',
    example: '2021-12-31',
  })
  @IsDateString()
  expiration: string;

  @ApiPropertyOptional({
    description: 'Plan status',
    enum: Status,
  })
  @IsEnum(Status)
  status?: Status;

  @ApiPropertyOptional({
    description: 'Plan created date',
    example: '2021-12-31',
  })
  created_at: Date;

  @ApiPropertyOptional({
    description: 'Plan updated date',
    example: '2021-12-31',
  })
  updated_at: Date;
}
