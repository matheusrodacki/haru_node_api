import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class IndividualDto {
  @ApiProperty({ description: 'Client ID', example: 1 })
  @IsNumber()
  client_id: number;

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
  @IsDate()
  date_of_birth: Date;
}
