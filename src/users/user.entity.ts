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
  @ApiProperty({ description: 'The unique identifier of the user', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @Column()
  email: string;

  @ApiProperty({ description: 'The hashed password of the user' })
  @Column()
  passwordHash: string;

  @ApiProperty({ description: 'The salt used for hashing the password' })
  @Column()
  salt: string;

  @ApiProperty({ description: 'The status of the user', example: 1 })
  @Column({ default: 1 })
  status: number;

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
