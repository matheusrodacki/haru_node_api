import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { AddressAdmin } from '../addresses_admin/address.entity';

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

  @OneToOne(() => AddressAdmin, (address) => address.user_id, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  addressAdmin: AddressAdmin;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
