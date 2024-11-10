import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCompanyDto {
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
    example: 'John Doe',
  })
  @IsString()
  contact_person: string;
}
