import { ApiProperty } from '@nestjs/swagger';
import { PermissionDto } from 'src/admin/permissions_admin/dto/permission.dto';

export class ProfileDto {
  @ApiProperty({ description: 'Profile ID', example: 1 })
  profile_id: number;

  @ApiProperty({ description: 'Profile name', example: 'Admin' })
  name: string;

  @ApiProperty({ description: 'Profile permissions', type: [PermissionDto] })
  permissions: PermissionDto[];

  @ApiProperty({
    description: 'Creation date',
    example: '2023-10-01T12:00:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2023-10-01T12:00:00Z',
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Deletion date',
    example: '2023-10-01T12:00:00Z',
    required: false,
  })
  deleted_at?: Date;
}
