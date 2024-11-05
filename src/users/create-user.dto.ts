// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Organization } from 'src/organizations/organization.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'User email', example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User password', example: 'securePassword123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'User organization' })
  @IsObject()
  @ValidateNested()
  @Type(() => Organization)
  @IsNotEmpty()
  organization: Organization;
}
