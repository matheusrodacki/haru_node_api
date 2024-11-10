import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreateIndividualDto {
  @ApiProperty({
    description: 'Full name',
    example: 'Alice Johnson',
  })
  @IsString()
  full_name: string;

  @ApiProperty({
    description: 'Social security number',
    example: '123-45-6789',
  })
  @IsString()
  social_security_number: string;

  @ApiProperty({
    description: 'Date of birth',
    example: '2023-10-01',
  })
  @IsDateString()
  date_of_birth: string;
}
