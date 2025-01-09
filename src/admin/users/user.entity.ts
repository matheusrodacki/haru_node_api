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
import { Profile } from '../profiles/profile.entity';
import { Status } from 'src/enum/status.enum';
import { Client } from '../clients/client.entity';

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

  @Column({ nullable: true })
  client_id?: number;

  @Column({ nullable: true })
  profile_id?: number;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  @Exclude()
  deleted_at?: Date;

  // Relationships
  @OneToOne(() => AddressAdmin, (address) => address.user, {
    cascade: true,
  })
  addressAdmin: AddressAdmin;

  @ManyToOne(() => Client, (client) => client.users)
  @JoinColumn({ name: 'client_id' })
  client?: Client;

  @ManyToOne(() => Profile, (profile) => profile.users)
  @JoinColumn({ name: 'profile_id' })
  profile?: Profile;
}
