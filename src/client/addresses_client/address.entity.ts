import { Exclude } from 'class-transformer';
import { AddressType } from 'src/enum/addressType.enum';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('addresses_client')
export class AddressClient {
  @PrimaryGeneratedColumn()
  address_id: number;

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

  @DeleteDateColumn()
  @Exclude()
  deleted_at?: Date;

  @Column({ type: 'enum', enum: AddressType })
  address_type: AddressType;
}
