// create-client.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { Status } from 'src/enum/status.enum';

export class ContractDto {
  @ApiProperty({ description: 'Contract ID', example: 1 })
  contract_id: number;

  @ApiProperty({ description: 'Contracted price', example: 100 })
  contracted_price: number;

  @ApiProperty({
    description: 'Contract date',
    example: '2023-10-01',
  })
  contract_date: Date;

  @ApiProperty({
    description: 'Contract status',
    enum: Status,
  })
  @IsEnum(Status)
  status: Status;

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

  @ApiProperty({ description: 'Client ID', example: 1 })
  @Transform(({ obj }) => obj.client?.id_client)
  client_id: number;

  @ApiProperty({ description: 'Plan ID', example: 1 })
  @Transform(({ obj }) => obj.plan?.id_plan)
  plan_id: number;
}
