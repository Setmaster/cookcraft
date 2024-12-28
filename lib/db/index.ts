import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './schema';
import {eq} from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

export async function seedUsers() {
    // Sample user data
    const users = [
        { name: 'Alice Smith', email: 'alice@example.com', password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'  },
        { name: 'Bob Johnson', email: 'bob@example.com' , password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' },
        { name: 'Carol Williams', email: 'carol@example.com' , password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.' },
    ];

    try {
        // Begin a transaction
        await db.transaction(async (trx) => {
            // Insert each user into the usersTable
            for (const user of users) {
                // Insert a single user
                await trx.insert(usersTable).values(user);
            }
        });

        console.log('Users have been seeded successfully.');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
}

export async function getAllUsers() {
    try {
        // Select all users from the usersTable
        const users = await db.select().from(usersTable);
        console.log('Retrieved users:', users);
        return users;
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw error;  // Re-throw error after logging
    }
}

export async function updateFirstUserAge(newAge: number) {
    try {
        // Start a transaction
        await db.transaction(async (trx) => {
            // Find the first user
            const [firstUser] = await trx.select().from(usersTable).limit(1);

            if (firstUser) {
                // Update the age of the first user
                await trx.update(usersTable)
                    .set({ age: newAge })
                    .where(eq(usersTable.id, firstUser.id));  // Use the eq function
                console.log(`Updated age for user ${firstUser.name} to ${newAge}.`);
            } else {
                console.log('No users found to update.');
            }
        });
    } catch (error) {
        console.error('Error updating user age:', error);
        throw error;  // Re-throw error after logging
    }
}

export async function deleteAllUsers() {
    try {
        // Delete all users from the usersTable
        await db.delete(usersTable);

        console.log('All users have been deleted successfully.');
    } catch (error) {
        console.error('Error deleting users:', error);
        throw error;  // Re-throw error after logging
    }
}