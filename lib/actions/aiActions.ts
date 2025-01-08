"use server";

import {GoogleGenerativeAI, SchemaType} from "@google/generative-ai";
import {Recipe} from "@/lib/types/generalTypes";
import { PredictionServiceClient } from '@google-cloud/aiplatform';
import { helpers } from '@google-cloud/aiplatform';
import { uploadBufferToGCS } from '../storage';
import { v4 as uuidv4 } from 'uuid';

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
        // Initialize the model with the "pro" version
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: recipeDataSchema,
            },
        });

        // Revised prompt with explicit instructions and example
        const prompt = `
Using the following list of ingredients, create a recipe data object that includes:

- **Title**: A descriptive title of the recipe.
- **Description**: A brief description of the recipe.
- **Ingredients**: A list of ingredients, including quantities.
- **Instructions**: Step-by-step cooking instructions without numbering or bullet points.
- **AdditionalInformation**: Include as much of the following as applicable:
  - **PrepTime**
  - **CookTime**
  - **TotalTime**
  - **Yield**
  - **CaloriesPerServing**

Ingredients: ${ingredientsList.join(", ")}

Provide the data in JSON format matching the provided schema. Ensure all fields are filled, and steps are written as plain sentences without any numbering.

Example Format:

{
  "Title": "Spaghetti Bolognese",
  "Description": "A classic Italian pasta dish with a rich, meaty sauce.",
  "Ingredients": ["200g spaghetti", "100g minced beef", "..."],
  "Instructions": ["Boil the spaghetti according to package instructions.", "Heat olive oil in a pan...", "..."],
  "AdditionalInformation": {
    "PrepTime": "10 mins",
    "CookTime": "30 mins",
    "TotalTime": "40 mins",
    "Yield": "2 servings",
    "CaloriesPerServing": "500"
  }
}

Please create a similar recipe using the ingredients provided.
`;

        // Generate content using the model
        const result = await model.generateContent(prompt);

        // Get the response text
        const responseText = result.response.text();

        // Parse JSON and validate against schema
        const recipeDataObj: Recipe = JSON.parse(responseText);

        // Post-processing to remove numbering from instructions
        recipeDataObj.Instructions = recipeDataObj.Instructions.map(instruction =>
            instruction.replace(/^\d+\.?\s*/, "")
        );
        
        if (!recipeDataObj.Description || recipeDataObj.Description.trim() === "") {
            recipeDataObj.Description = "Delicious homemade recipe.";
        }

        if (!recipeDataObj.AdditionalInformation) {
            recipeDataObj.AdditionalInformation = {
                PrepTime: null,
                CookTime: null,
                TotalTime: null,
                Yield: null,
                CaloriesPerServing: null,
            };
        }

        return { error: null, data: recipeDataObj };
    } catch (error) {
        console.error("Error generating recipe data:", error);
        return { error: (error as Error).message, data: null };
    }
}

export async function generateAndSaveRecipeImage(prompt: string): Promise<string> {
    const projectId = process.env.GOOGLE_PROJECT_ID;
    const location = 'us-central1'; // Replace with your preferred location
    
    const clientOptions = {
        apiEndpoint: `${location}-aiplatform.googleapis.com`,
        projectId: projectId,
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
    };
    
    const predictionServiceClient = new PredictionServiceClient(clientOptions);

    // Define model endpoint
    const endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/imagen-3.0-generate-001`;

    // Define request payload
    const instance = {
        prompt: prompt,
    };
    const instanceValue = helpers.toValue(instance);
    const instances = [instanceValue];

    const parameters = helpers.toValue({
        sampleCount: 1,
    });

    const request = {
        endpoint: endpoint,
        instances: instances,
        parameters: parameters,
    };

    try {
        // gen image
        const [response] = await predictionServiceClient.predict(request);
        const predictions = response.predictions;

        if (predictions.length === 0) {
            throw new Error('No image was generated. Check the request parameters and prompt.');
        } else {
            // Get image
            const prediction = predictions[0];
            const base64Image = prediction.structValue.fields.bytesBase64Encoded.stringValue;

            // Convert base64-encoded image to a Buffer
            const imageBuffer = Buffer.from(base64Image, 'base64');

            // Gen unique name for the image
            const filename = `recipe-images/${uuidv4()}.png`;

            // Define bucket
            const bucketName = 'cookcraft-ai-images';
            const contentType = 'image/png';

            // Upload the image
            const imageUrl = await uploadBufferToGCS(imageBuffer, filename, bucketName, contentType);

            // Return image's public URL
            return imageUrl;
        }
    } catch (error) {
        throw new Error(`Failed to generate and save image: ${error}`);
    }
}