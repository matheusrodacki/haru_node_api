import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto {
  @ApiProperty({ description: 'Permission ID', example: 1 })
  permission_id: number;

  @ApiProperty({ description: 'Permission role', example: 'user.create' })
  role: string;

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
