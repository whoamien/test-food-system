import { AppDataSource } from '../data-source'; // Adjust the path to your data source file
import { AdminUser } from '../entity/AdminUser';
import { comparePassword, hashPassword } from '../util/security';
import { BaseService } from './BaseService';

export class AdminUserService extends BaseService {
	private adminUserRepository = AppDataSource.getRepository(AdminUser);
	userRepository: any;

	// Create a new AdminUser
	async createAdminUser(userData: Partial<AdminUser>): Promise<AdminUser> {
		const adminUser = this.adminUserRepository.create(userData);
		if (userData.password_hash) {
			adminUser.password_hash = await hashPassword(userData.password_hash);
			adminUser.passwordChangeDate = new Date();
		}
		return await this.adminUserRepository.save(adminUser);
	}

	// Get all AdminUsers
	async getAllAdminUsers(): Promise<AdminUser[]> {
		return await this.adminUserRepository.find();
	}

	// Get an AdminUser by ID
	async getAdminUserById(id: number): Promise<AdminUser | undefined> {
		return await this.adminUserRepository.findOneBy({ id });
	}

	// Update an AdminUser by ID
	async updateAdminUser(id: number, updateData: Partial<AdminUser>): Promise<AdminUser | null> {
		const adminUser = await this.adminUserRepository.findOneBy({ id });
		if (!adminUser) {
			return null;
		}

		if (updateData.password_hash) {
			if (!(await comparePassword(updateData.password_hash, adminUser.password_hash))) {
				adminUser.password_hash = await hashPassword(updateData.password_hash);
				adminUser.passwordChangeDate = new Date();
			}
			delete updateData.password_hash; // Remove password_hash from updateData to avoid saving it again
		}
		Object.assign(adminUser, updateData);

		return await this.adminUserRepository.save(adminUser);
	}

	// Delete an AdminUser by ID
	async deleteAdminUser(id: number): Promise<boolean> {
		const adminUser = await this.getAdminUserById(id);
		if (!adminUser) return false;
		adminUser.status = 'deleted';
		await this.adminUserRepository.save(adminUser);
		return true;
	}

	// Authenticate AdminUser by username and password hash
	async authenticateAdminUser(username: string, passwordHash: string): Promise<AdminUser | null> {
		const adminUser = await this.adminUserRepository.findOneBy({
			username,
		});
		if (!adminUser) {
			return null;
		}
		const isPasswordValid = await comparePassword(passwordHash, adminUser.password_hash);
		if (!isPasswordValid) {
			return null;
		}
		return adminUser;
	}

	async isAdminUser(userId: number): Promise<boolean> {
		const admin = await this.adminUserRepository.findOneBy({ id: userId });
		return !!admin;
	}
}
