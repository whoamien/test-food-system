import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Table } from "./Table";

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations, { nullable: true })
  user: User;

  @Column({ length: 100, nullable: true })
  guest_name: string;

  @Column({ length: 100, nullable: true })
  guest_email: string;

  @Column({ length: 20, nullable: true })
  guest_phone: string;

  @Column({ type: "datetime" })
  reservation_time: Date;

  @Column()
  number_of_people: number;

  @Column({ type: "text", nullable: true })
  special_request: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @ManyToMany(() => Table, (table) => table.reservations)
  @JoinTable()
  tables: Table[];
}
