import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { recipe } from './schema';
import { eq } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {Recipe} from "@/lib/types/generalTypes";

export const db = drizzle(process.env.DATABASE_URL!);

// Helper function for transaction
async function executeTransaction(
    action: (trx: NodePgDatabase) => Promise<void>,
    successMessage: string,
    errorMessage: string
) {
    try {
        await db.transaction(action);
        console.log(successMessage);
    } catch (error) {
        console.error(errorMessage, error);
        throw error;
    }
}

// Recipes
export async function insertNewRecipe(recipeJSON: string, userId: string, imageUrl: string) {
    try {
        await executeTransaction(
            async (trx: NodePgDatabase) => {
                await trx.insert(recipe).values({
                    userId: userId,
                    data: recipeJSON,
                    dateCreated: new Date(),
                    imageUrl: imageUrl,
                });
            },
            'Recipe has been added successfully.',
            'Error adding a recipe'
        );
    } catch (error) {
        console.error('Error inserting new recipe:', error);
        throw error; // Re-throw error after logging
    }
}

export async function deleteRecipe(recipeId: number) {
    await executeTransaction(
        async (trx: NodePgDatabase) => {
            await trx.delete(recipe).where(eq(recipe.id, recipeId));
        },
        'Recipe has been deleted successfully.',
        'Error deleting a recipe'
    );
}

export async function updateRecipe(
    recipeId: number,
    updatedData: Partial<Recipe>
) {
    await executeTransaction(
        async (trx: NodePgDatabase) => {
            const [existingRecipe] = await trx
                .select()
                .from(recipe)
                .where(eq(recipe.id, recipeId));

            if (existingRecipe) {
                const existingData = JSON.parse(existingRecipe.data) as Recipe;
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
        'Error updating the recipe.'
    );
}

export async function getRecipesByUserId(userId: string) {
    try {
        const recipes = await db.select().from(recipe).where(eq(recipe.userId, userId));
        return recipes;
    } catch (error) {
        throw error;
    }
}

export async function getRecipeById(recipeId: number) {
    try {
        const [recipeRecord] = await db.select().from(recipe).where(eq(recipe.id, recipeId));
        return recipeRecord;
    } catch (error) {
        throw error;
    }
}
