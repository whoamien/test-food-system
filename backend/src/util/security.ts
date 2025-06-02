import { hash, compare } from 'bcrypt';

const SALT_ROUNDS = 10;

// Encrypt (hash) a plain password
export async function hashPassword(plainPassword: string): Promise<string> {
	return await hash(plainPassword, SALT_ROUNDS);
}

// Compare (decrypt) a plain password with a hash
export async function comparePassword(plainPassword: string, hash: string): Promise<boolean> {
	return await compare(plainPassword, hash);
}
