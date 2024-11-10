import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateIndividualDto } from './create-individual.dto';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateIndividualDto extends PartialType(CreateIndividualDto) {
  @ApiPropertyOptional({
    description: 'Full name',
    example: 1,
  })
  @IsString()
  @IsOptional()
  full_name?: string;

  @ApiPropertyOptional({
    description: 'Social security number',
    example: '123-45-6789',
  })
  @IsString()
  @IsOptional()
  social_security_number?: string;

  @ApiPropertyOptional({
    description: 'Date of birth',
    example: '2023-10-01',
  })
  @IsDate()
  @IsOptional()
  date_of_birth?: Date;
}
