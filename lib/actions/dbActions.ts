'use server'

import {getAllUsers, seedUsers, deleteAllUsers, insertNewRecipe} from "@/lib/db";
import {generateRecipeData} from "@/lib/actions/aiActions";

function handleError(actionName: string, error: any) {
    console.error(`Error during ${actionName}:`, error);
    throw new Error(`Error during ${actionName}`);
}

export async function seedUsersA() {
    try {
        await seedUsers();
        return {message: 'Users seeded successfully'};
    } catch (error) {
        handleError('seeding users', error);
    }
}

export async function getAllUsersA() {
    try {
        const users = await getAllUsers();
        return users;
    } catch (error) {
        handleError('retrieving users', error);
    }
}

export async function deleteAllUsersA() {
    try {
        await deleteAllUsers();
        return {message: 'All users deleted successfully'};
    } catch (error) {
        handleError('deleting users', error);
    }
}

export async function generateAndSaveRecipe(ingredientsList: string[], userId: number) {
    try {
        const { data: recipeData, error } = await generateRecipeData(ingredientsList);

        if (error) {
            throw new Error(`Error generating recipe: ${error}`);
        }

        if (!recipeData) {
            throw new Error('No recipe generated');
        }

        const { Title, Ingredients, Instructions, AdditionalInformation } = recipeData;

        const recipeJSON = JSON.stringify({
            Title,
            Ingredients,
            Instructions,
            AdditionalInformation,
        });

        await insertNewRecipe(recipeJSON, userId);

        return { message: 'Recipe generated and saved successfully' };
    } catch (error) {
        console.error('Error generating and saving recipe:', error);
        throw error;  // Re-throw error after logging
    }
}
