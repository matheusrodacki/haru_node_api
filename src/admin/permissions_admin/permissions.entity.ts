import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Profile } from '../profiles_admin/profile.entity';
import { Exclude } from 'class-transformer';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  permission_id: number;

  @Column()
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  @Exclude()
  deleted_at?: Date;

  // Relationships

  @ManyToMany(() => Profile, (profile) => profile.permissions)
  profiles: Profile[];
}
