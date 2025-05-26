import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Reservation } from "./Reservation";

@Entity()
export class Table {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 10 })
    table_number: string;

    @Column()
    capacity: number;

    @ManyToMany(() => Reservation, (reservation) => reservation.tables)
    reservations: Reservation[];
}