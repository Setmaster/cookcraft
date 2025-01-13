'use client';

import { useState } from 'react';
import { Prompt } from "@/components/PromptBar/Prompt";
import Listings from "@/components/Recipes/Listings";
import { Space } from "@mantine/core";
import {Recipe} from "@/lib/types/generalTypes";

interface RecipesPageClientProps {
    initialRecipes: Recipe[];
}

export default function RecipesPageClient({ initialRecipes }: RecipesPageClientProps) {
    const [recipes, setRecipes] = useState(initialRecipes);

    const refreshRecipes = async () => {
        const response = await fetch('/api/recipes');
        if (response.ok) {
            const updatedRecipes = await response.json();
            setRecipes(updatedRecipes);
        } else {
            console.error('Failed to refresh recipes');
        }
    };

    return (
        <>
            <Prompt onRecipeGenerated={refreshRecipes} />
            <Space h="xl" />
            <Listings recipes={recipes} />
        </>
    );
}
