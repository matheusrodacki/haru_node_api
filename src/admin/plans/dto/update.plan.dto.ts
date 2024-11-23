// create-organization.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Status } from 'src/enum/status.enum';

export class UpdatePlanDto {
  @ApiPropertyOptional({
    description: 'Plan name',
    example: 'Plan name',
  })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Plan price',
    example: 100.0,
  })
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    description: 'Plan expiration date',
    example: '2021-12-31',
  })
  @IsOptional()
  expiration?: string;

  @ApiPropertyOptional({
    description: 'Plan status',
    enum: Status,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
