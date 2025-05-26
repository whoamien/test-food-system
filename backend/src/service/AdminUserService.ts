import { AppDataSource } from "../data-source"; // Adjust the path to your data source file
import { AdminUser } from "../entity/AdminUser";

export class AdminUserService {
    private adminUserRepository = AppDataSource.getRepository(AdminUser);

    // Create a new AdminUser
    async createAdminUser(username: string, passwordHash: string, email: string): Promise<AdminUser> {
        const adminUser = this.adminUserRepository.create({
            username,
            password_hash: passwordHash,
            email,
        });
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
    async updateAdminUser(id: number, username?: string, email?: string): Promise<AdminUser | null> {
        const adminUser = await this.adminUserRepository.findOneBy({ id });
        if (!adminUser) {
            return null;
        }
        if (username) adminUser.username = username;
        if (email) adminUser.email = email;
        return await this.adminUserRepository.save(adminUser);
    }

    // Delete an AdminUser by ID
    async deleteAdminUser(id: number): Promise<boolean> {
        const result = await this.adminUserRepository.delete(id);
        return result.affected !== 0;
    }

    // Authenticate AdminUser by username and password hash
    async authenticateAdminUser(username: string, passwordHash: string): Promise<AdminUser | null> {
        const adminUser = await this.adminUserRepository.findOneBy({ username, password_hash: passwordHash });
        return adminUser || null;
    }
}