import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './schema';
import { recipesTable } from './schema';
import {eq} from "drizzle-orm";

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

        console.log('Users have been seeded successfully.');
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

        console.log('User has been added successfully.');
    } catch (error) {
        console.error('Error adding users:', error);
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

export async function updateUser(userId: number,newName: string, newPassword: string) {
    try {
        // Start a transaction
        await db.transaction(async (trx) => {
            // Find the first user
            const [user] = await trx.select().from(usersTable).where(eq(usersTable.id, userId));

            const validName =  newName === null || newName === undefined || newName === "" ? user.name : newName;
            const validPassword =  newPassword === null || newPassword === undefined || newPassword === "" ? user.password : newPassword;

            if (user) {
                await trx.update(usersTable)
                    .set({ name: validName , password: validPassword})
                    .where(eq(usersTable.id, userId));  // Use the eq function
                console.log(`User updated.`);
            } else {
                console.log('No user found to update.');
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

export async function deleteUser(userId: number) {
    try {
        await db.delete(usersTable).where(eq(usersTable.id, userId));

        console.log('User has been deleted successfully.');
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;  // Re-throw error after logging
    }
}

////// Recipes

export async function insertNewRecipe(recipeData: string, userId: number) {
    const recipe = { data: recipeData, userId };

    try {
        // Begin a transaction
        await db.transaction(async (trx) => {
            await trx.insert(recipesTable).values(recipe);
        });

        console.log('Recipe has been added successfully.');
    } catch (error) {
        console.error('Error adding recipe:', error);
        throw error;  // Re-throw error after logging
    }
}

export async function deleteRecipe(recipeId: number) {
    try {
        await db.delete(recipesTable).where(eq(recipesTable.id, recipeId));

        console.log('Recipe has been deleted successfully.');
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

            const validName =  newName === null || newName === undefined || newName === "" ? recipe.name : newName;
            const validIngredients =  newIngredients === null || newIngredients === undefined || newIngredients === "" ? recipe.ingredients : newIngredients;

            if (recipe) {
                await trx.update(recipesTable)
                    .set({ name: validName , ingredients: validIngredients})
                    .where(eq(recipesTable.id, recipeId));  // Use the eq function
                console.log(`Recipe updated.`);
            } else {
                console.log('No recipe found to update.');
            }
        });
    } catch (error) {
        console.error('Error updating user age:', error);
        throw error;  // Re-throw error after logging
    }
}

export async function getRecipesByUserId(userId: number) {
    try {
        const recipes = await db.select().from(recipesTable).where(eq(recipesTable.userId, userId));
        console.log(`Retrieved ${recipes.length} recipes for user ID: ${userId}`);
        return recipes;
    } catch (error) {
        console.error('Error retrieving recipes:', error);
        throw error;  // Re-throw error after logging
    }
}