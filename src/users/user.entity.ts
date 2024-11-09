import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client } from '../clients/client.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  role: string;

  @Column({ default: 1 })
  status: number;

  @ManyToOne(() => Client, (client) => client.users, {
    nullable: false,
  })
  client: Client;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
