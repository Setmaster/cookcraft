'use client';

import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Card, Modal, Button, Text, Title, Group } from '@mantine/core';
import { Recipe } from '@/lib/types/generalTypes';

interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            {/* Recipe Card */}
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                onClick={open}
                style={{ cursor: 'pointer' }}
            >
                <Group position="apart" mb="xs">
                    <Title order={4}>{recipe.Title}</Title>
                </Group>
                <Text size="sm" color="dimmed">
                    {recipe.Description || 'No description available.'}
                </Text>
            </Card>

            {/* Recipe Modal */}
            <Modal opened={opened} onClose={close} title={recipe.Title} size="lg">
                <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {/* Ingredients Section */}
                    <Title order={5}>Ingredients</Title>
                    {recipe.Ingredients && recipe.Ingredients.length > 0 ? (
                        <ul>
                            {recipe.Ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    ) : (
                        <Text>No ingredients listed.</Text>
                    )}

                    {/* Instructions Section */}
                    <Title order={5} mt="md">
                        Instructions
                    </Title>
                    {recipe.Instructions && recipe.Instructions.length > 0 ? (
                        <ol>
                            {recipe.Instructions.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    ) : (
                        <Text>No instructions provided.</Text>
                    )}

                    {/* Additional Information */}
                    {recipe.AdditionalInformation && (
                        <>
                            <Title order={5} mt="md">
                                Additional Information
                            </Title>
                            {Object.entries(recipe.AdditionalInformation).map(
                                ([key, value]) => (
                                    <Text key={key}>
                                        <strong>{key}:</strong> {value}
                                    </Text>
                                )
                            )}
                        </>
                    )}
                </div>

                {/* Close Button */}
                <Button onClick={close} mt="md">
                    Close
                </Button>
            </Modal>
        </>
    );
}
