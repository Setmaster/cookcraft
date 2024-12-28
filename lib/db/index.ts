import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './schema';
import { recipesTable } from './schema';
import {eq} from "drizzle-orm";
import { validateString } from '@/utils/indexHelpers'
import logger from '@/utils/logger';

const db = drizzle(process.env.DATABASE_URL!);

////////// Users

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

        logger.info('Users have been seeded successfully.');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
}

export async function insertNewUser(name: string, email: string, password: string) {
    const user = { name: name, email: email, password: password };

    try {
        // Begin a transaction
        await db.transaction(async (trx) => {
        await trx.insert(usersTable).values(user);
        });

        logger.info('User has been added successfully.');
    } catch (error) {
        console.error('Error adding users:', error);
    }
}

export async function getAllUsers() {
    try {
        // Select all users from the usersTable
        const users = await db.select().from(usersTable);
        logger.info('Retrieved users:', users);
        return users;
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw error;  // Re-throw error after logging
    }
}

export async function updateUser(userId: number,newName: string, newPassword: string) {
    try {
        // Start a transaction
        await db.transaction(async (trx) => {
            // Find the first user
            const [user] = await trx.select().from(usersTable).where(eq(usersTable.id, userId));

            const validName = validateString(newName,user.name);
            const validPassword =   validateString(newPassword,user.password); 

            if (user) {
                await trx.update(usersTable)
                    .set({ name: validName , password: validPassword})
                    .where(eq(usersTable.id, userId));  // Use the eq function
                logger.info(`User updated.`);
            } else {
                logger.info('No user found to update.');
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

        logger.info('All users have been deleted successfully.');
    } catch (error) {
        console.error('Error deleting users:', error);
        throw error;  // Re-throw error after logging
    }
}

export async function deleteUser(userId: number) {
    try {
        await db.delete(usersTable).where(eq(usersTable.id, userId));

        logger.info('User has been deleted successfully.');
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;  // Re-throw error after logging
    }
}

////// Recipes

export async function insertNewRecipe(name: string, ingredients: string, userId: number) {
    const recipe = { name: name, ingredients: ingredients, userId: userId };

    try {
        // Begin a transaction
        await db.transaction(async (trx) => {
        await trx.insert(recipesTable).values(recipe);
        });

        logger.info('recipe has been added successfully.');
    } catch (error) {
        console.error('Error adding recipe:', error);
    }
}

export async function deleteRecipe(recipeId: number) {
    try {
        await db.delete(recipesTable).where(eq(recipesTable.id, recipeId));

        logger.info('Recipe has been deleted successfully.');
    } catch (error) {
        console.error('Error deleting recipe:', error);
        throw error;  // Re-throw error after logging
    }
}

export async function updateRecipe(recipeId: number,newName: string, newIngredients: string ) {
    try {
        // Start a transaction
        await db.transaction(async (trx) => {
            // Find the first user
            const [recipe] = await trx.select().from(recipesTable).where(eq(recipesTable.id, recipeId));
            
            const validName = validateString(newName,recipe.name);
            const validIngredients = validateString(newIngredients,recipe.ingredients);

            if (recipe) {
                await trx.update(recipesTable)
                    .set({ name: validName , ingredients: validIngredients})
                    .where(eq(recipesTable.id, recipeId));  // Use the eq function
                logger.info(`Recipe updated.`);
            } else {
                logger.info('No recipe found to update.');
            }
        });
    } catch (error) {
        console.error('Error updating user age:', error);
        throw error;  // Re-throw error after logging
    }
}