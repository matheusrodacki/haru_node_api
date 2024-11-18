import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { AddressType } from 'src/enum/adressType.enum';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
  @ApiProperty({ description: 'Street name' })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiProperty({ description: 'Street number' })
  @IsOptional()
  @IsString()
  number?: string;

  @ApiProperty({ description: 'Additional information (optional)' })
  @IsOptional()
  @IsString()
  additionalInfo?: string;

  @ApiProperty({ description: 'City' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ description: 'State' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ description: 'Country' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ description: 'Postal code' })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiProperty({ description: 'Address Type', enum: AddressType })
  @IsOptional()
  @IsEnum(AddressType)
  adress_type?: AddressType;

  @ApiProperty({ description: 'Client ID' })
  @IsOptional()
  @IsInt()
  clientId?: number;
}
