import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Food } from "./Food";
import { OpeningHour } from "./OpeningHour";


@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "text", nullable: true })
    keywords: string;

    @Column({ length: 50, nullable: true })
    cuisine_type: string;

    @Column({ length: 20, nullable: true })
    phone: string;

    @Column({ type: "text", nullable: true })
    address: string;

    @Column({ length: 255, nullable: true })
    google_maps_url: string;

    @Column({ type: "decimal", precision: 10, scale: 8, nullable: true })
    latitude: number;

    @Column({ type: "decimal", precision: 11, scale: 8, nullable: true })
    longitude: number;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @OneToMany(() => OpeningHour, (openingHour) => openingHour.restaurant)
    opening_hours: OpeningHour[];

    @OneToMany(() => Food, (food) => food.restaurant)
    foods: Food[];
}