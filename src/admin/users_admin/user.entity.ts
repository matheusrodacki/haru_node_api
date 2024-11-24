import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { AddressAdmin } from '../addresses_admin/address.entity';
import { Profile } from '../profiles_admin/profile.entity';

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

  @Column({ nullable: true })
  profile_id?: number;

  @Column({ default: 1 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  // Relationships

  @OneToOne(() => AddressAdmin, (address) => address.user, {
    cascade: true,
  })
  addressAdmin: AddressAdmin;

  @ManyToOne(() => Profile, (profile) => profile.users)
  @JoinColumn({ name: 'profile_id' })
  profile?: Profile;
}
