import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  client_id: number;

  @Column()
  name: string;

  @Exclude()
  @OneToMany(() => User, (user) => user.client)
  users: User[];

  @Column({ default: 1 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
