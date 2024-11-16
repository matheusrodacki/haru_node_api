import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Client } from 'src/clientContext/clientTenants/client.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

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
