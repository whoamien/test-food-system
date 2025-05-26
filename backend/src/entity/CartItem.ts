import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Cart } from "./Cart";
import { Food } from "./Food";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart: Cart;

  @ManyToOne(() => Food, { nullable: false })
  food: Food;

  @Column({ default: 1 })
  quantity: number;
}
