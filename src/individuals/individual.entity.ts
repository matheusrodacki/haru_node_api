import { Exclude } from 'class-transformer';
import { Client } from 'src/clients/client.entity';
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('individuals')
export class Individual {
  @PrimaryColumn()
  client_id: number;

  @Column()
  full_name: string;

  @Column()
  social_security_number: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  // Relationships
  @OneToOne(() => Client, (client) => client.individual)
  @JoinColumn({ name: 'client_id' })
  @Exclude()
  client: Client;
}
