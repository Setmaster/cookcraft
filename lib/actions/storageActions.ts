import {generateAndSaveRecipeImage} from "@/lib/actions/aiActions";
import {deleteFileFromGCS} from "@/lib/storage";


export async function createRecipeImageA(prompt: string): Promise<string> {
    try {
        const imageUrl = await generateAndSaveRecipeImage(prompt);
        console.log('Generated image URL:', imageUrl);
        return imageUrl;
    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
}

export async function deleteRecipeImageA(imageUrl: string): Promise<void> {
    try {
        const bucketName = 'cookcraft-ai-images';
        const fileName = imageUrl.split(`https://storage.googleapis.com/${bucketName}/`)[1];

        if (!fileName) {
            throw new Error('Invalid image URL');
        }

        await deleteFileFromGCS(fileName, bucketName);
    } catch (error) {
        throw new Error(`Failed to delete image: ${error}`);
    }
}