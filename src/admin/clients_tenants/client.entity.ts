import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { ClientType } from 'src/enum/clientType.enum';
import { Status } from 'src/enum/status.enum';
import { Exclude } from 'class-transformer';
import { Address } from '../addresses_admin/address.entity';
import { Company } from '../companies/company.entity';
import { Individual } from '../individuals/individual.entity';
import { User } from '../users_admin/user.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  client_id: number;

  @Column({ type: 'enum', enum: ClientType })
  client_type: ClientType;

  @Column({
    type: 'enum',
    enum: Status,
    default: 'Active',
  })
  status: Status;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @OneToOne(() => Individual, (individual) => individual.client, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  individual?: Individual;

  @OneToOne(() => Company, (company) => company.client, {
    cascade: true,
    onDelete: 'CASCADE',
    nullable: true,
  })
  company?: Company;

  @OneToMany(() => Address, (address) => address.client, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  addresses: Address[];

  @Exclude()
  @OneToMany(() => User, (user) => user.client, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  users: User[];
}
