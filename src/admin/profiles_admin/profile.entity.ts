import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../users_admin/user.entity';
import { Permission } from '../permissions_admin/permissions.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  profile_id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @OneToMany(() => User, (user) => user.profile)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.profiles, {
    cascade: true,
  })
  @JoinTable()
  permissions: Permission[];
}
