import {Container, SimpleGrid} from "@mantine/core";
import classes from './Listings.module.css';
import RecipeCard from "@/components/RecipeCard/RecipeCard";

export default function Listings(){
    return (
        <>
            <Container fluid className={classes.listingsContainer}>
                <SimpleGrid cols={{base: 1, sm: 2, md: 3, xl: 4}}>
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                </SimpleGrid>
            </Container>
        </>
    )
}