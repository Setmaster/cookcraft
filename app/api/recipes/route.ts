import {NextRequest, NextResponse} from 'next/server';
import {fetchUserRecipes, generateAndSaveRecipe} from '@/lib/actions/dbActions';

export async function GET() {
    try {
        const recipes = await fetchUserRecipes();
        return NextResponse.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { ingredientsList } = await request.json();
        if (!ingredientsList || !Array.isArray(ingredientsList)) {
            return NextResponse.json({ error: 'Invalid ingredientsList' }, { status: 400 });
        }

        await generateAndSaveRecipe(ingredientsList);

        return NextResponse.json({ message: 'Recipe generated and saved successfully' });
    } catch (error) {
        console.error('Error generating and saving recipe:', error);
        return NextResponse.json({ error: 'Failed to generate and save recipe' }, { status: 500 });
    }
}