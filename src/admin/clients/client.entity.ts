import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Company } from '../companies/company.entity';
import { Individual } from '../individuals/individual.entity';

import { ClientType } from 'src/enum/clientType.enum';
import { Status } from 'src/enum/status.enum';
import { Contract } from '../contracts/contract.entity';

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
    nullable: true,
  })
  individual?: Individual;

  @OneToOne(() => Company, (company) => company.client, {
    cascade: true,
    nullable: true,
  })
  company?: Company;

  @OneToMany(() => Contract, (contract) => contract.client, {
    cascade: true,
    nullable: true,
  })
  contracts?: Contract[];
}
