import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from './Cart';
import { Order } from './Order';
import { Reservation } from './Reservation';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100 })
	username: string;

	@Column({ length: 100 })
	name: string;

	@Column({ length: 100, unique: true })
	email: string;

	@Exclude()
	@Column({ length: 255 })
	password_hash: string;

	@Column({ length: 20, nullable: true })
	phone: string;

	@Column({ type: 'date', nullable: true })
	birth_date: Date;

	@Column({ type: 'enum', enum: ['male', 'female', 'other'], nullable: true })
	gender: string;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@Column({ type: 'enum', enum: ['active', 'deleted'], default: 'active' })
	status: 'active' | 'deleted';

	@Column({ type: 'datetime', nullable: true })
	passwordChangeDate: Date;

	@OneToMany(() => Cart, (cart) => cart.user)
	carts: Cart[];

	@OneToMany(() => Order, (order) => order.user)
	orders: Order[];

	@OneToMany(() => Reservation, (reservation) => reservation.user)
	reservations: Reservation[];
}
