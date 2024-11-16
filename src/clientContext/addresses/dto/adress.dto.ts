import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { AddressType } from 'src/enum/adressType.enum';

export class AddressDto {
  @ApiProperty({ description: 'Address ID', example: 1 })
  @IsInt()
  address_id: number;

  @ApiProperty({ description: 'Street name' })
  @IsString()
  street: string;

  @ApiProperty({ description: 'Street number' })
  @IsString()
  number: string;

  @ApiProperty({ description: 'Additional information (optional)' })
  @IsString()
  additionalInfo?: string;

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
  postalCode: string;

  @ApiProperty({ description: 'Address Type', enum: AddressType })
  @IsEnum(AddressType)
  adress_type: AddressType;

  @ApiProperty({ description: 'Client ID' })
  @IsInt()
  clientId?: number;
}
