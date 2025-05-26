import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Restaurant } from "./Restaurant";
import { User } from "./User";
import { FoodCategory } from "./FoodCategory";

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => FoodCategory, (category) => category.foods, {
    nullable: true,
  })
  category: FoodCategory;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.foods, {
    nullable: true,
  })
  restaurant: Restaurant;

  @Column({ length: 255, nullable: true })
  image_url: string;

  @Column({ default: true })
  available: boolean;

  @Column({ type: "enum", enum: ["active", "deleted"], default: "active" })
  status: "active" | "deleted";

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @ManyToMany(() => User)
  @JoinTable()
  favorites: User[];
}
