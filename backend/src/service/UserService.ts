import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { FindOptionsWhere, ILike } from 'typeorm';
import { BaseService } from './BaseService';
import { comparePassword, hashPassword } from '../util/security';

export class UserService extends BaseService {
	private userRepository = AppDataSource.getRepository(User);

	async create(userData: Partial<User>): Promise<User> {
		const user = this.userRepository.create(userData);
		if (userData.password_hash) {
			user.password_hash = await hashPassword(userData.password_hash);
			user.passwordChangeDate = new Date();
		}
		return await this.userRepository.save(user);
	}

	async getById(id: number): Promise<User | null> {
		return await this.userRepository.findOne({
			where: { id, status: 'active' },
		});
	}

	async update(id: number, updateData: Partial<User>): Promise<User | null> {
		const user = await this.getById(id);
		if (!user) return null;

		if (updateData.password_hash) {
			if (!(await comparePassword(updateData.password_hash, user.password_hash))) {
				user.password_hash = await hashPassword(updateData.password_hash);
				user.passwordChangeDate = new Date();
			}
			delete updateData.password_hash; // Remove password_hash from updateData to avoid saving it again
		}

		Object.assign(user, updateData);

		return await this.userRepository.save(user);
	}

	async delete(id: number): Promise<boolean> {
		const user = await this.getById(id);
		if (!user) return false;
		user.status = 'deleted';
		await this.userRepository.save(user);
		return true;
	}

	async list(
		options: {
			name?: string;
			email?: string;
			status?: string;
			page?: number;
			pageSize?: number;
			[key: string]: any;
		} = {}
	): Promise<{
		data: User[];
		total: number;
		page: number;
		pageSize: number;
		totalPages: number;
	}> {
		const { name, email, status, page = 1, pageSize = 20, ...rest } = options;

		const where: FindOptionsWhere<User> = {};

		if (name) {
			where.name = ILike(`%${name}%`);
		}
		if (email) {
			where.email = ILike(`%${email}%`);
		}
		if (status && (status === 'active' || status === 'deleted')) {
			where.status = status;
		} else {
			where.status = 'active';
		}

		const skip = (page - 1) * pageSize;
		const take = pageSize;

		const [data, total] = await this.userRepository.findAndCount({
			where,
			skip,
			take,
			order: { id: 'DESC' },
		});

		const totalPages = Math.ceil(total / pageSize);

		return { data, total, page, pageSize, totalPages };
	}
}
