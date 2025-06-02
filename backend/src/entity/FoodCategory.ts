import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Food } from './Food';

@Entity()
export class FoodCategory {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 50 })
	name: string;

	@Column({ type: 'enum', enum: ['active', 'deleted'], default: 'active' })
	status: 'active' | 'deleted';

	@OneToMany(() => Food, (food) => food.category)
	foods: Food[];
}
