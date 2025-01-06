import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { user, recipe } from './schema';
import { eq } from 'drizzle-orm';
// import { validateString } from '@/lib/utils/indexHelpers';
// import logger from '@/lib/utils/logger';
import { Recipe } from '@/lib/types/generalTypes';

export const db = drizzle(process.env.DATABASE_URL!);

// Helper function for transaction and logging
async function executeTransaction(
    action: (trx: any) => Promise<void>,
    successMessage: string,
    errorMessage: string,
    additionalInfo: object = {}
) {
    try {
        await db.transaction(action);
        // logger.info(successMessage, {
        //     ...additionalInfo,
        //     status: 'success',
        //     timestamp: new Date().toISOString()
        // });
    } catch (error) {
        // logger.error(errorMessage, {
        //     message: error,
        //     ...additionalInfo
        // });
        throw error;
    }
}

// Recipes
export async function insertNewRecipe(recipeJSON: string, userId: number) {
    try {
        await executeTransaction(
            async (trx: any) => {
                await trx.insert(recipe).values({
                    userId: userId,
                    data: recipeJSON,
                    dateCreated: new Date(),
                });
            },
            'Recipe has been added successfully.',
            'Error adding a recipe',
        );
    } catch (error) {
        console.error('Error inserting new recipe:', error);
        throw error;  // Re-throw error after logging
    }
}

export async function deleteRecipe(recipeId: number) {
    await executeTransaction(
        async (trx) => {
            await trx.delete(recipe).where(eq(recipe.id, recipeId));
        },
        'Recipe has been deleted successfully.',
        'Error deleting a recipe',
        { recipeId }
    );
}

export async function updateRecipe(
    recipeId: number,
    updatedData: Partial<Recipe['Data']>
) {
    await executeTransaction(
        async (trx) => {
            const [recipe] = await trx
                .select()
                .from(recipe)
                .where(eq(recipe.id, recipeId));

            if (recipe) {
                const existingData = JSON.parse(recipe.data);
                const newData = { ...existingData, ...updatedData };

                await trx
                    .update(recipe)
                    .set({ data: JSON.stringify(newData) })
                    .where(eq(recipe.id, recipeId));
            } else {
                throw new Error('No recipe found to update.');
            }
        },
        'Recipe updated successfully.',
        'Error updating the recipe.',
        { recipeId }
    );
}

export async function getRecipesByUserId(userId: number) {
    try {
        const recipes = await db.select().from(recipe).where(eq(recipe.userId, userId));
        // logger.info(`Retrieved ${recipes.length} recipes for user ID: ${userId}`, {
        //     route: '/lib/db',
        //     status: 'success',
        //     timestamp: new Date().toISOString()
        // });
        return recipes;
    } catch (error) {
        // logger.error('Error retrieving recipes', {
        //     message: error,
        //     route: '/lib/db',
        // });
        throw error;
    }
}
