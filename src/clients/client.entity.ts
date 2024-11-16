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
import { User } from 'src/users/user.entity';
import { Individual } from 'src/individuals/individual.entity';
import { Company } from 'src/companies/company.entity';
import { Address } from 'src/addresses/address.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  client_id: number;

  @Column({ type: 'enum', enum: ClientType })
  clientType: ClientType;

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

  @OneToMany(() => Address, (address) => address.client, { cascade: true })
  addresses: Address[];

  @Exclude()
  @OneToMany(() => User, (user) => user.client)
  users: User[];
}
