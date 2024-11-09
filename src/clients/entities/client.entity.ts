import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { ClientType } from 'src/enum/clientType.enum';
import { Status } from 'src/enum/status.enum';
import { Exclude } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { Individual } from 'src/individuals/entities/individual.entity';

@Entity('clients')
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
  @OneToOne(() => Individual, (individual) => individual.client, {
    cascade: true,
    nullable: true,
  })
  individual?: Individual;

  @Exclude()
  @OneToMany(() => User, (user) => user.client)
  users: User[];
}
