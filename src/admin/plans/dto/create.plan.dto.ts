import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Status } from 'src/enum/status.enum';

export class CreatePlanDto {
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
  expiration: Date;

  @ApiPropertyOptional({
    description: 'Plan status',
    enum: Status,
  })
  @IsEnum(Status)
  status?: Status;
}
