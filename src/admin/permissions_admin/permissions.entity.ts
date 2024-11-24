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

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  permission_id: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  // Relationships

  @ManyToMany(() => Profile, (profile) => profile.permissions)
  profiles: Profile[];
}
