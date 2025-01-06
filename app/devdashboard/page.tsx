'use client';
import {Button} from '@mantine/core';
import {useRouter} from 'next/navigation';
import {seedRecipesA, seedUsersA} from "@/lib/actions/dbActions";
// import {generateRecipeA} from "@/lib/actions/aiActions";

export default function DevDashboard() {
    const router = useRouter();

    const handleButtonClick = () => {
        // Navigate to a non-existent page to test the 404 page
        router.push('/non-existent-page');
    };

    const handleSeedUsers = async () => {
        // Call the seedUsersA action
        // const response = await seedUsersA();
        console.log("n/a");
    }

    const handleSeedRecipes = async () => {
        const response = await seedRecipesA();
        console.log(response);
    }
    
    return (
        <main>
            <h1>This is the dev dashboard page</h1>
            <Button onClick={handleButtonClick}>
                404 Error Test
            </Button>
            <Button onClick={handleSeedUsers}>
                Seed Users Test
            </Button>
            <Button onClick={handleSeedRecipes}>
                Seed Recipes Test
            </Button>
        </main>
    );
}
