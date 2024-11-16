import { Client } from 'src/clients/client.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  additionalInfo: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  postalCode: string;

  // Relationships
  @ManyToOne(() => Client, (client) => client.addresses)
  client: Client;
}
