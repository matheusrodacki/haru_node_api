import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CompanyDto {
  @ApiProperty({ description: 'Client ID', example: 1 })
  @IsNumber()
  client_id: number;

  @ApiProperty({
    description: 'Company name',
    example: 'Company Inc',
  })
  @IsString()
  company_name: string;

  @ApiProperty({
    description: 'Tax ID number',
    example: '123-45-6789',
  })
  @IsString()
  tax_id_number: string;

  @ApiProperty({
    description: 'Contact person',
    example: 'Valerie Doe',
  })
  @IsString()
  contact_person: string;
}
