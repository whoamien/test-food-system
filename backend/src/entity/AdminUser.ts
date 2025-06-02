import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class AdminUser {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100 })
	username: string;

	@Column({ length: 255 })
	@Exclude()
	password_hash: string;

	@Column({ length: 100, unique: true })
	email: string;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;

	@Column({ type: 'datetime', nullable: true })
	last_login: Date;

	@Column({ type: 'datetime', nullable: true })
	passwordChangeDate: Date;

	@Column({ type: 'enum', enum: ['active', 'deleted'], default: 'active' })
	status: 'active' | 'deleted';
}
