import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";
import { User } from "./User";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Cart, { nullable: false })
  cart: Cart;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total_amount: number;

  @Column({
    type: "enum",
    enum: ["pending", "paid", "cancelled"],
    default: "pending",
  })
  status: string;

  @Column({ length: 50, nullable: true })
  payment_method: string;

  @Column({ type: "datetime", nullable: true })
  paid_at: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
