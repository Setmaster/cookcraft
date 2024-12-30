import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable, recipesTable } from './schema';
import { eq } from 'drizzle-orm';
import { validateString } from '@/lib/utils/indexHelpers';
import logger from '@/lib/utils/logger';
import { Recipe } from '@/lib/types/generalTypes';
import bcrypt from "bcrypt";

const db = drizzle(process.env.DATABASE_URL!);

// Helper function for transaction and logging
async function executeTransaction(
    action: (trx: any) => Promise<void>,
    successMessage: string,
    errorMessage: string,
    additionalInfo: object = {}
) {
    try {
        await db.transaction(action);
        logger.info(successMessage, {
            ...additionalInfo,
            status: 'success',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.error(errorMessage, {
            message: error,
            ...additionalInfo
        });
        throw error;
    }
}

// Users
export async function insertNewUser(name: string, email: string, password: string) {
    
    await executeTransaction(
        async (trx) => {
            const [existingUser] = await trx.select().from(usersTable).where(eq(usersTable.email, email));

            if (!existingUser) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = { name, email, password: hashedPassword };
                await trx.insert(usersTable).values(user);
            } else {
                throw new Error('User with such email already exists.');
            }
            
        },
        'User has been added successfully.',
        'Error adding a user',
        { name, email }
    );
}

export async function getAllUsers() {
    try {
        const users = await db.select().from(usersTable);
        logger.info('Retrieved users.', {
            route: '/lib/db',
            status: 'success',
            timestamp: new Date().toISOString()
        });
        return users;
    } catch (error) {
        logger.error('Error retrieving users', {
            message: error,
            route: '/lib/db',
        });
        throw error;
    }
}

export async function validLogin(email: string, password: string): Promise<boolean>   {
    try {
        const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (!existingUser) {
        return false;
    }
    else {
        const isMatch = await bcrypt.compare(password, existingUser.password);
        return isMatch; 
    }
    } catch (error) {
        logger.error('Error validating login credentials', {
            message: error,
            route: '/lib/db',
        });
        throw error;
    }
}

export async function updateUser(userId: number, newName: string, newPassword: string) {
    await executeTransaction(
        async (trx) => {
            const [user] = await trx.select().from(usersTable).where(eq(usersTable.id, userId));

            if (user) {
                const validName = validateString(newName, user.name);
                let validPassword = user.password;
                if (newPassword) {
                    validPassword = await bcrypt.hash(newPassword, 10);
                } 
                await trx.update(usersTable)
                    .set({ name: validName, password: validPassword })
                    .where(eq(usersTable.id, userId));
            } else {
                throw new Error('No user found to update.');
            }
        },
        'User updated.',
        'Error updating a user',
        { userId, newName }
    );
}

export async function deleteAllUsers() {
    await executeTransaction(
        async (trx) => {
            await trx.delete(usersTable);
        },
        'All users have been deleted successfully.',
        'Error deleting users'
    );
}

export async function deleteUser(userId: number) {
    await executeTransaction(
        async (trx) => {
            await trx.delete(usersTable).where(eq(usersTable.id, userId));
        },
        'User has been deleted successfully.',
        'Error deleting a user',
        { userId }
    );
}

// Recipes
export async function insertNewRecipe(recipeData: Recipe['Data'], userId: number) {
    const recipe = { data: JSON.stringify(recipeData), userId };

    await executeTransaction(
        async (trx) => {
            await trx.insert(recipesTable).values(recipe);
        },
        'Recipe has been added successfully.',
        'Error adding a recipe',
        { recipe }
    );
}

export async function deleteRecipe(recipeId: number) {
    await executeTransaction(
        async (trx) => {
            await trx.delete(recipesTable).where(eq(recipesTable.id, recipeId));
        },
        'Recipe has been deleted successfully.',
        'Error deleting a recipe',
        { recipeId }
    );
}

export async function updateRecipe(recipeId: number, newTitle: string, newIngredients: string[]) {
    await executeTransaction(
        async (trx) => {
            const [recipe] = await trx.select().from(recipesTable).where(eq(recipesTable.id, recipeId));

            if (recipe) {
                const updatedData = { ...JSON.parse(recipe.data), Title: newTitle, Ingredients: newIngredients };

                await trx.update(recipesTable)
                    .set({ data: JSON.stringify(updatedData) })
                    .where(eq(recipesTable.id, recipeId));
            } else {
                throw new Error('No recipe found to update.');
            }
        },
        'Recipe updated.',
        'Error updating a recipe',
        { recipeId, newTitle }
    );
}

export async function getRecipesByUserId(userId: number) {
    try {
        const recipes = await db.select().from(recipesTable).where(eq(recipesTable.userId, userId));
        logger.info(`Retrieved ${recipes.length} recipes for user ID: ${userId}`, {
            route: '/lib/db',
            status: 'success',
            timestamp: new Date().toISOString()
        });
        return recipes;
    } catch (error) {
        logger.error('Error retrieving recipes', {
            message: error,
            route: '/lib/db',
        });
        throw error;
    }
}
