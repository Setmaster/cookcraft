'use client';

import { Container, SimpleGrid } from '@mantine/core';
import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { Recipe } from '@/lib/types/generalTypes';

interface ListingsProps {
    recipes: Recipe[];
}

export default function Listings({ recipes }: ListingsProps) {
    return (
        <Container fluid>
            <SimpleGrid cols={{base: 1, sm: 3}} spacing="lg">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </SimpleGrid>
        </Container>
    );
}
