import { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Inserts seed entries
  await knex('users').insert([
    {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    },
    {
      username: 'manager1',
      email: 'manager1@example.com',
      password: hashedPassword,
      role: 'manager',
      isActive: true,
    },
    {
      username: 'tenant1',
      email: 'tenant1@example.com',
      password: hashedPassword,
      role: 'tenant',
      isActive: true,
    },
    {
      username: 'tenant2',
      email: 'tenant2@example.com',
      password: hashedPassword,
      role: 'tenant',
      isActive: true,
    },
  ]);
} 