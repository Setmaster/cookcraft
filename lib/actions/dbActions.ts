﻿'use server';

import {
    insertNewRecipe,
    getRecipesByUserId,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
} from '@/lib/db';
import { generateRecipeData } from '@/lib/actions/aiActions';
import { Recipe } from '@/lib/types/generalTypes';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import {
    createRecipeImageA,
    deleteRecipeImageA,
} from '@/lib/actions/storageActions';

function handleError(actionName: string, error: unknown) {
    console.error(`Error during ${actionName}:`, error);
    throw new Error(`Error during ${actionName}`);
}

export async function fetchUserRecipes(): Promise<Recipe[]> {
    try {
        const headersList = await headers();
        const session = await auth.api.getSession({ headers: headersList });

        if (!session) {
            console.error('User not authenticated');
            return [];
        }

        const userId = session.user.id;

        const recipesFromDb = await getRecipesByUserId(userId);

        const recipes: Recipe[] = recipesFromDb.map((recipeRecord) => {
            const data = JSON.parse(recipeRecord.data);

            return {
                id: recipeRecord.id,
                userId: recipeRecord.userId,
                dateCreated: recipeRecord.dateCreated,
                imageUrl: recipeRecord.imageUrl,
                ...data,
            };
        });

        return recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw new Error('Failed to fetch recipes');
    }
}

export async function generateAndSaveRecipe(ingredientsList: string[]) {
    try {
        const headersList = await headers();
        const session = await auth.api.getSession({ headers: headersList });

        if (!session) {
            throw new Error('User not authenticated');
        }

        const userId = session.user.id;
        const { data: recipeData, error } = await generateRecipeData(ingredientsList);

        if (error) {
            throw new Error(`Error generating recipe: ${error}`);
        }

        if (!recipeData) {
            throw new Error('No recipe generated');
        }

        const {
            Title,
            Ingredients,
            Instructions,
            Description,
            AdditionalInformation,
        } = recipeData;

        // Use Description as prompt, fallback to Title if necessary
        const prompt = Description && Description.trim() !== '' ? Description : Title;

        // Generate image and get imageUrl
        const imageUrl = await createRecipeImageA(prompt);

        const recipeJSON = JSON.stringify({
            Title,
            Ingredients,
            Description,
            Instructions,
            AdditionalInformation,
        });

        await insertNewRecipe(recipeJSON, userId, imageUrl);

        return { message: 'Recipe generated and saved successfully' };
    } catch (error) {
        console.error('Error generating and saving recipe:', error);
        throw error; // Re-throw error after logging
    }
}

export async function updateRecipeA(
    recipeId: number,
    updatedData: Partial<Recipe>
) {
    try {
        await updateRecipe(recipeId, updatedData);
        return { message: 'Recipe updated successfully' };
    } catch (error) {
        handleError('updating recipe', error);
    }
}

export async function deleteRecipeA(recipeId: number) {
    try {
        const recipeRecord = await getRecipeById(recipeId);
        if (!recipeRecord) {
            throw new Error('Recipe not found');
        }
        const imageUrl = recipeRecord.imageUrl;

        if (imageUrl) {
            await deleteRecipeImageA(imageUrl);
        }

        await deleteRecipe(recipeId);

        return { message: 'Recipe deleted successfully' };
    } catch (error) {
        handleError('deleting recipe', error);
    }
}
