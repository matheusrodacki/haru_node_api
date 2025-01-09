import { AddressType } from 'src/enum/addressType.enum';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Exclude } from 'class-transformer';

@Entity('addresses_admin')
export class AddressAdmin {
  @PrimaryColumn()
  user_id: number;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  additional_info: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  postal_code: string;

  @Column({ type: 'enum', enum: AddressType })
  address_type: AddressType;

  @DeleteDateColumn()
  @Exclude()
  deleted_at?: Date;

  //Relationships
  @OneToOne(() => User, (user) => user.addressAdmin)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
