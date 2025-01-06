import React from 'react';
import { fetchUserRecipes } from "@/lib/actions/dbActions";
import RecipesPageClient from '@/components/Recipes/RecipesPageClient';

export default async function RecipesPage() {
    const recipes = await fetchUserRecipes();
    return <RecipesPageClient initialRecipes={recipes} />;
}