import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateIndividualDto } from './create-individual.dto';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateIndividualDto extends PartialType(CreateIndividualDto) {
  @ApiProperty({
    description: 'Full name',
    example: 1,
  })
  @IsString()
  @IsOptional()
  full_name: string;

  @ApiProperty({
    description: 'Social security number',
    example: '123-45-6789',
  })
  @IsString()
  @IsOptional()
  social_security_number: string;

  @ApiProperty({
    description: 'Date of birth',
    example: '2023-10-01',
  })
  @IsDate()
  @IsOptional()
  date_of_birth: Date;
}
