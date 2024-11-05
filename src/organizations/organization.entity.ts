import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Organization {
  @ApiProperty({ description: 'The unique identifier of the organization' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'The name of the organization' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The users belonging to the organization',
    type: () => [User],
  })
  @OneToMany(() => User, (user) => user.organization)
  users: User[];
}
