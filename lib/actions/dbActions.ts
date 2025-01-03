'use server'

import {getAllUsers, deleteAllUsers, insertNewRecipe, getRecipesByUserId, updateRecipe} from "@/lib/db";
import {generateRecipeData} from "@/lib/actions/aiActions";
import {seedUsers} from "@/lib/db/seed/seedUsers";
import {seedRecipes} from "@/lib/db/seed/seedRecipes";
import {Recipe} from "@/lib/types/generalTypes";

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

export async function seedRecipesA() {
    try {
        await seedRecipes();
        return { message: 'Recipes seeded successfully' };
    } catch (error) {
        handleError('seeding recipes', error);
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

export async function fetchUserRecipes(userId: number): Promise<Recipe[]> {
    try {
        const recipesFromDb = await getRecipesByUserId(userId);
        
        // Map over the recipes and parse the data field
        const recipes: Recipe[] = recipesFromDb.map((recipeRecord) => {
            const data = JSON.parse(recipeRecord.data);

            return {
                id: recipeRecord.id,
                userId: recipeRecord.userId,
                dateCreated: recipeRecord.dateCreated,
                ...data, // Spread the parsed data properties
            };
        });

        return recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw new Error('Failed to fetch recipes');
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

        const { Title, Ingredients, Instructions, Description, AdditionalInformation } = recipeData;

        const recipeJSON = JSON.stringify({
            Title,
            Ingredients,
            Description,
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

export async function updateRecipeA(
    recipeId: number,
    updatedData: Partial<Recipe['Data']>
) {
    try {
        await updateRecipe(recipeId, updatedData);
        return { message: 'Recipe updated successfully' };
    } catch (error) {
        handleError('updating recipe', error);
    }
}