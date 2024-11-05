import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ description: 'The unique identifier of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the user' })
  @Column()
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  @Column()
  email: string;

  @ApiProperty({
    description: 'The organization to which the user belongs',
    type: () => Organization,
  })
  @ManyToOne(() => Organization, (organization) => organization.users, {
    nullable: false,
  })
  organization: Organization;

  @ApiProperty({ description: 'The date the user was created' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'The date the user was last updated' })
  @UpdateDateColumn()
  updated_at: Date;
}
