import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiPropertyOptional({
    description: 'Company name',
    example: 'Company Inc',
  })
  @IsString()
  @IsOptional()
  company_name?: string;

  @ApiPropertyOptional({
    description: 'Tax ID number',
    example: '123-45-6789',
  })
  @IsString()
  @IsOptional()
  tax_id_number?: string;

  @ApiPropertyOptional({
    description: 'Contact person',
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  contact_person?: string;
}
