import { Container, SimpleGrid } from "@mantine/core";
import classes from './Listings.module.css';
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import { getRecipesByUserId } from "@/lib/db";
import { useEffect, useState } from "react";
import {Recipe} from "@/lib/types/generalTypes";

export default function Listings() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const fetchedRecipes = await getRecipesByUserId(1); // Hardcoded user ID 1
                setRecipes(fetchedRecipes);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <Container fluid className={classes.listingsContainer}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, xl: 4 }}>
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} /> // Pass recipe as a prop
                ))}
            </SimpleGrid>
        </Container>
    );
}
