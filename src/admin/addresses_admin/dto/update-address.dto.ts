import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAddressAdminDto } from './create-address.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AddressType } from 'src/enum/addressType.enum';

export class UpdateAddressAdminDto extends PartialType(CreateAddressAdminDto) {
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
  additional_info?: string;

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
  postal_code?: string;

  @ApiProperty({ description: 'Address Type', enum: AddressType })
  @IsOptional()
  @IsEnum(AddressType)
  address_type?: AddressType;
}
