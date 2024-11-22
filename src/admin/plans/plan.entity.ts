import { Status } from 'src/enum/status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Contract } from '../contracts/contract.entity';
import { Exclude } from 'class-transformer';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn()
  plan_id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'date', nullable: true })
  expiration: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: 'Active',
  })
  status: Status;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @OneToMany(() => Contract, (contract) => contract.plan)
  @Exclude()
  contracts: Contract[];
}
