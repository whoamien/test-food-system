import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { CartItem } from "./CartItem";


@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.carts)
    user: User;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ default: false })
    checked_out: boolean;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    items: CartItem[];
}