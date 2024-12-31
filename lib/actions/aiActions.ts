"use server";

import {GoogleGenerativeAI, SchemaType} from "@google/generative-ai";
import {Recipe} from "@/lib/types/generalTypes";

// Define the JSON schema for the recipe
const recipeDataSchema = {
    description: "Structured recipe data format",
    type: SchemaType.OBJECT,
    properties: {
        Title: {
            type: SchemaType.STRING,
            description: "The title of the recipe",
            nullable: false,
        },
        Description: {
            type: SchemaType.STRING,
            description: "A brief description of the recipe",
            nullable: false,
        },
        Ingredients: {
            type: SchemaType.ARRAY,
            description: "List of ingredients",
            items: {
                type: SchemaType.STRING,
            },
            nullable: false,
        },
        Instructions: {
            type: SchemaType.ARRAY,
            description: "Step-by-step cooking instructions",
            items: {
                type: SchemaType.STRING,
            },
            nullable: false,
        },
        AdditionalInformation: {
            type: SchemaType.OBJECT,
            description: "Additional information about the recipe",
            properties: {
                PrepTime: {
                    type: SchemaType.STRING,
                    description: "Preparation time",
                    nullable: true,
                },
                CookTime: {
                    type: SchemaType.STRING,
                    description: "Cooking time",
                    nullable: true,
                },
                TotalTime: {
                    type: SchemaType.STRING,
                    description: "Total time needed",
                    nullable: true,
                },
                Yield: {
                    type: SchemaType.STRING,
                    description: "Number of servings or quantity produced",
                    nullable: true,
                },
                CaloriesPerServing: {
                    type: SchemaType.STRING,
                    description: "Calories per serving",
                    nullable: true,
                },
            },
            nullable: true,
        },
    },
    required: ["Title", "Description", "Ingredients", "Instructions"],
};

// Initialize AI using the API key
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

export async function generateRecipeData(
    ingredientsList: string[]
): Promise<{ error: string | null; data: Recipe | null }> {
    try {
        // Get the generative model with the specified schema
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: recipeDataSchema,
            },
        });

        // Define the prompt with instructions
        const prompt = `
Using the following list of ingredients, create a recipe data object that includes a title, a brief description, ingredients, step-by-step instructions, and any additional information such as prep time, cook time, total time, yield, and calories per serving if applicable.

Ingredients: ${ingredientsList}

Provide the data in JSON format matching the provided schema.
`;

        // Generate content using the model
        const result = await model.generateContent(prompt);

        // Get the response text
        const responseText = result.response.text();

        // Convert JSON to object
        const recipeDataObj: Recipe = JSON.parse(responseText);
        
        return {error: null, data: recipeDataObj};
    } catch (error) {
        console.error("Error generating recipe data:", error);
        return {error: (error as Error).message, data: null};
    }
}
