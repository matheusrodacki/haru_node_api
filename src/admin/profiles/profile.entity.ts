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
import { User } from '../users/user.entity';
import { Permission } from '../permissions/permissions.entity';
import { Exclude } from 'class-transformer';

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
  @Exclude()
  deleted_at?: Date;

  @OneToMany(() => User, (user) => user.profile)
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.profiles, {
    cascade: true,
  })
  @JoinTable()
  permissions: Permission[];
}
