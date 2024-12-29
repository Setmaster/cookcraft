import { Card, Modal, ScrollArea, TypographyStylesProvider } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import classes from './RecipeCard.module.css';
import RecipeImage from "@/components/RecipeCard/RecipeImage";
import {Recipe} from "@/lib/types/generalTypes";

type RecipeCardProps = {
    recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const [opened, { open, close }] = useDisclosure(false);

    const handleCardClick = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default navigation behavior
        open(); // Open the modal
    };

    return (
        <>
            <Card
                withBorder
                padding="lg"
                radius="md"
                className={classes.card}
                onClick={handleCardClick}
                component="div" // Change Link component to div to stop navigation
            >
                <Card.Section mb="sm">
                    <div className={classes.saleImageContainer}>
                        <RecipeImage />
                    </div>
                </Card.Section>

                <Card.Section className={classes.footer}>
                    <div className={classes.bottomText}>{recipe.Title}</div>
                </Card.Section>
            </Card>

            <Modal
                opened={opened}
                onClose={close}
                title="Recipe Information"
                size="lg"
            >
                <ScrollArea style={{ height: '70vh' }}>
                    <TypographyStylesProvider>
                        <div>
                            <h1>{recipe.Title}</h1>
                            <p>{recipe.Description}</p>
                            <h2>Ingredients</h2>
                            <ul>
                                {recipe.Ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                            <h2>Instructions</h2>
                            <ol>
                                {recipe.Instructions.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                ))}
                            </ol>
                            {recipe.AdditionalInformation && (
                                <div>
                                    <h2>Additional Information</h2>
                                    {Object.entries(recipe.AdditionalInformation).map(([key, value]) => (
                                        value && <p key={key}><strong>{key}:</strong> {value}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </TypographyStylesProvider>
                </ScrollArea>
            </Modal>
        </>
    );
}
