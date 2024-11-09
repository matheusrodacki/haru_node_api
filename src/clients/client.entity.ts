import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ClientType } from 'src/enum/clientType.enum';
import { Status } from 'src/enum/status.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  client_id: number;

  @Column({ type: 'enum', enum: ClientType })
  clientType: ClientType;

  @Column({
    type: 'enum',
    enum: Status,
    default: 'Active',
  })
  status: Status;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @Exclude()
  @OneToMany(() => User, (user) => user.client)
  users: User[];
}
