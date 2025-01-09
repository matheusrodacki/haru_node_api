import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProfileDto {
  @ApiProperty({ description: 'Profile ID', example: 1 })
  @Expose()
  profile_id: number;

  @ApiProperty({ description: 'Profile name', example: 'Admin' })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Profile permissions',
    type: [String],
  })
  @Expose()
  permissions: string[];

  @ApiProperty({
    description: 'Creation date',
    example: '2023-10-01T12:00:00Z',
  })
  @Expose()
  created_at: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2023-10-01T12:00:00Z',
  })
  @Expose()
  updated_at: Date;
}
