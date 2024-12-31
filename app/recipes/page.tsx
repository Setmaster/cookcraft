'use client';

import { useState, useEffect } from 'react';
import { Prompt } from "@/components/PromptBar/Prompt";
import Listings from "@/components/Recipes/Listings";
import { fetchUserRecipes } from "@/lib/actions/dbActions";
import { Space } from "@mantine/core";

export default function RecipesPage() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Fetch recipes on component mount
        const fetchRecipes = async () => {
            const initialRecipes = await fetchUserRecipes(1);
            setRecipes(initialRecipes);
        };
        fetchRecipes();
    }, []);
    
    const refreshRecipes = async () => {
        const updatedRecipes = await fetchUserRecipes(1);
        setRecipes(updatedRecipes);
    };

    return (
        <>
            <Prompt onRecipeGenerated={refreshRecipes} />
            <Space h="xl" />
            <Listings recipes={recipes} />
        </>
    );
}
