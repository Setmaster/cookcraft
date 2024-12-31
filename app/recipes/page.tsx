import { Prompt } from "@/components/PromptBar/Prompt";
import Listings from "@/components/Recipes/Listings";
import { fetchUserRecipes } from "@/lib/actions/dbActions";
import {Space} from "@mantine/core";

export default async function RecipesPage() {
    const recipes = await fetchUserRecipes(1); // Fetch recipes for user ID 1

    return (
        <>
            <Prompt />
            <Space h="xl" />
            <Listings recipes={recipes} />
        </>
    );
}