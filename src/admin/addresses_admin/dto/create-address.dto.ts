import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AddressType } from 'src/enum/addressType.enum';

export class CreateAddressAdminDto {
  @ApiProperty({ description: 'Street name' })
  @IsString()
  street: string;

  @ApiProperty({ description: 'Street number' })
  @IsString()
  number: string;

  @ApiProperty({ description: 'Additional information (optional)' })
  @IsOptional()
  @IsString()
  additional_info?: string;

  @ApiProperty({ description: 'City' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'State' })
  @IsString()
  state: string;

  @ApiProperty({ description: 'Country' })
  @IsString()
  country: string;

  @ApiProperty({ description: 'Postal code' })
  @IsString()
  postal_code: string;

  @ApiProperty({ description: 'Address Type', enum: AddressType })
  @IsEnum(AddressType)
  adress_type: AddressType;
}
