import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurant } from './Restaurant';

@Entity()
export class OpeningHour {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Restaurant, (restaurant) => restaurant.opening_hours)
	restaurant: Restaurant;

	@Column({
		type: 'enum',
		enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	})
	day_of_week: string;

	@Column({ type: 'time' })
	open_time: string;

	@Column({ type: 'time' })
	close_time: string;
}
