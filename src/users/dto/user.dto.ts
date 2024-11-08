import { ApiProperty } from '@nestjs/swagger';
import { Organization } from '../../organizations/organization.entity';

export class UserDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'User name', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'User email', example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ description: 'User status', example: 1 })
  status: number;

  @ApiProperty({
    description: 'Organization the user belongs to',
    type: () => Organization,
  })
  organization: Organization;

  @ApiProperty({
    description: 'Creation date',
    example: '2023-10-01T12:00:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2023-10-02T15:30:00Z',
  })
  updated_at: Date;
}
