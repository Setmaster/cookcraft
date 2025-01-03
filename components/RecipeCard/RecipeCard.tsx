'use client';

import React, { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
    Card,
    Modal,
    Button,
    Text,
    Title,
    Group,
    TextInput,
    Textarea,
    Stack,
    ActionIcon,
    Divider
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Recipe } from '@/lib/types/generalTypes';
import { updateRecipeA } from '@/lib/actions/dbActions';
import { IconTrash } from '@tabler/icons-react';

interface RecipeCardProps {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const [isEditing, setIsEditing] = useState(false);

    // Initialize the form with existing recipe data
    const form = useForm({
        initialValues: {
            title: recipe.Title || '',
            description: recipe.Description || '',
            ingredients: recipe.Ingredients && recipe.Ingredients.length > 0
                ? [...recipe.Ingredients, '']
                : [''],
            instructions: recipe.Instructions && recipe.Instructions.length > 0
                ? [...recipe.Instructions, '']
                : [''],
            additionalInfo: recipe.AdditionalInformation
                ? [...Object.entries(recipe.AdditionalInformation).map(([key, value]) => ({ key, value })), { key: '', value: '' }]
                : [{ key: '', value: '' }],
        },
    });

    // Destructure form.values for easier access
    const { values, setFieldValue, reset } = form;

    // Handle dynamic Ingredients
    useEffect(() => {
        const lastIngredient = values.ingredients[values.ingredients.length - 1];
        if (lastIngredient.trim() !== '') {
            setFieldValue('ingredients', [...values.ingredients, '']);
        }
    }, [values.ingredients, setFieldValue]);

    // Handle dynamic Instructions
    useEffect(() => {
        const lastInstruction = values.instructions[values.instructions.length - 1];
        if (lastInstruction.trim() !== '') {
            setFieldValue('instructions', [...values.instructions, '']);
        }
    }, [values.instructions, setFieldValue]);

    // Handle dynamic Additional Information
    useEffect(() => {
        const lastAdditionalInfo = values.additionalInfo[values.additionalInfo.length - 1];
        if (lastAdditionalInfo.key.trim() !== '' || lastAdditionalInfo.value.trim() !== '') {
            setFieldValue('additionalInfo', [...values.additionalInfo, { key: '', value: '' }]);
        }
    }, [values.additionalInfo, setFieldValue]);

    // Remove empty Ingredients or empty entries and keep one empty field
    useEffect(() => {
        // Ingredients
        const ingredients = values.ingredients.filter((ing, index) => {
            if (index === values.ingredients.length - 1) return true; // Keep the last one
            return ing.trim() !== '';
        });
        if (ingredients.length !== values.ingredients.length) {
            setFieldValue('ingredients', ingredients);
        }

        // Instructions
        const instructions = values.instructions.filter((instr, index) => {
            if (index === values.instructions.length - 1) return true; // Keep the last one
            return instr.trim() !== '';
        });
        if (instructions.length !== values.instructions.length) {
            setFieldValue('instructions', instructions);
        }

        // Additional Information
        const additionalInfo = values.additionalInfo.filter((info, index) => {
            if (index === values.additionalInfo.length - 1) return true; // Keep the last one
            return info.key.trim() !== '' || info.value.trim() !== '';
        });
        if (additionalInfo.length !== values.additionalInfo.length) {
            setFieldValue('additionalInfo', additionalInfo);
        }
    }, [values.ingredients, values.instructions, values.additionalInfo, setFieldValue]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        reset();
    };

    const handleSubmit = async (formValues: typeof form.values) => {
        // Filter out empty ingredients
        const filteredIngredients = formValues.ingredients.filter(ing => ing.trim() !== '');
      
        // Filter out empty instructions
        const filteredInstructions = formValues.instructions.filter(instr => instr.trim() !== '');
      
        // Filter out empty additional information
        const filteredAdditionalInfo = formValues.additionalInfo
            .filter(info => info.key.trim() !== '' && info.value.trim() !== '')
            .reduce((acc, curr) => {
                acc[curr.key.trim()] = curr.value.trim();
                return acc;
            }, {} as { [key: string]: string });

        const updatedData: Partial<Recipe['Data']> = {
            Title: formValues.title,
            Description: formValues.description,
            Ingredients: filteredIngredients,
            Instructions: filteredInstructions,
            AdditionalInformation: Object.keys(filteredAdditionalInfo).length > 0
                ? filteredAdditionalInfo
                : {},
        };

        try {
            await updateRecipeA(recipe.id, updatedData);
            //TODO optimistic update
            window.location.reload();
        } catch (error) {
            console.error('Failed to update recipe:', error);
            // TODO use toast to display error to user
        }
    };

    // Custom handler for modal close
    const handleModalClose = () => {
        if (isEditing) {
            handleCancelEdit(); // Reset form and exit edit mode
        }
        close(); // Close the modal
    };

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
            <Modal
                opened={opened}
                onClose={handleModalClose}
                title={isEditing ? 'Edit Recipe' : recipe.Title}
                size="xl" // Increased size from 'lg' to 'xl'
                overlayProps={{
                    opacity: 0.55,
                    blur: 3,
                }}
            >
                <div style={{ maxHeight: '70vh', overflowY: 'auto',paddingRight: '16px' }}>
                    {!isEditing ? (
                        <>
                            {/* View Mode */}
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
                            {recipe.AdditionalInformation && Object.keys(recipe.AdditionalInformation).length > 0 && (
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
                        </>
                    ) : (
                        <>
                            {/* Edit Mode */}
                            <form onSubmit={form.onSubmit(handleSubmit)}>
                                <Stack spacing="md">
                                    {/* Title Input */}
                                    <TextInput
                                        label="Title"
                                        placeholder="Recipe Title"
                                        {...form.getInputProps('title')}
                                        required
                                    />

                                    {/* Description Textarea */}
                                    <Textarea
                                        label="Description"
                                        placeholder="Recipe Description"
                                        {...form.getInputProps('description')}
                                        minRows={0}
                                        resize="vertical"
                                        styles={{ input: { minHeight: 0 } }}
                                    />

                                    {/* Ingredients Section */}
                                    <Divider label="Ingredients" labelPosition="center" my="sm" />
                                    <Stack spacing="xs">
                                        {values.ingredients.map((ingredient, index) => (
                                            <Group key={index} position="apart" align="center">
                                                <Textarea
                                                    placeholder={`Ingredient ${index + 1}`}
                                                    value={ingredient}
                                                    onChange={(event) => {
                                                        const newIngredients = [...values.ingredients];
                                                        newIngredients[index] = event.currentTarget.value;
                                                        setFieldValue('ingredients', newIngredients);
                                                    }}
                                                    autosize
                                                    resize="vertical"
                                                    style={{ flex: 1, minHeight: 0 }}
                                                />
                                                {values.ingredients.length > 1 && (
                                                    <ActionIcon
                                                        color="red"
                                                        onClick={() => {
                                                            const newIngredients = [...values.ingredients];
                                                            newIngredients.splice(index, 1);
                                                            setFieldValue('ingredients', newIngredients);
                                                        }}
                                                    >
                                                        <IconTrash size={16} />
                                                    </ActionIcon>
                                                )}
                                            </Group>
                                        ))}
                                    </Stack>

                                    {/* Instructions Section */}
                                    <Divider label="Instructions" labelPosition="center" my="sm" />
                                    <Stack spacing="xs">
                                        {values.instructions.map((instruction, index) => (
                                            <Group key={index} position="apart" align="center">
                                                <Textarea
                                                    placeholder={`Instruction ${index + 1}`}
                                                    value={instruction}
                                                    onChange={(event) => {
                                                        const newInstructions = [...values.instructions];
                                                        newInstructions[index] = event.currentTarget.value;
                                                        setFieldValue('instructions', newInstructions);
                                                    }}
                                                    autosize
                                                    resize="vertical"
                                                    style={{ flex: 1, minHeight: 0 }}
                                                />
                                                {values.instructions.length > 1 && (
                                                    <ActionIcon
                                                        color="red"
                                                        onClick={() => {
                                                            const newInstructions = [...values.instructions];
                                                            newInstructions.splice(index, 1);
                                                            setFieldValue('instructions', newInstructions);
                                                        }}
                                                    >
                                                        <IconTrash size={16} />
                                                    </ActionIcon>
                                                )}
                                            </Group>
                                        ))}
                                    </Stack>

                                    {/* Additional Information Section */}
                                    <Divider label="Additional Information" labelPosition="center" my="sm" />
                                    <Stack spacing="xs">
                                        {values.additionalInfo.map((info, index) => (
                                            <Group key={index} position="apart" align="flex-end">
                                                <TextInput
                                                    placeholder="Key"
                                                    value={info.key}
                                                    onChange={(event) => {
                                                        const newAdditionalInfo = [...values.additionalInfo];
                                                        newAdditionalInfo[index].key = event.currentTarget.value;
                                                        setFieldValue('additionalInfo', newAdditionalInfo);
                                                    }}
                                                    style={{ flex: 1, marginRight: 8 }}
                                                    resize="vertical"
                                                />
                                                <TextInput
                                                    placeholder="Value"
                                                    value={info.value}
                                                    onChange={(event) => {
                                                        const newAdditionalInfo = [...values.additionalInfo];
                                                        newAdditionalInfo[index].value = event.currentTarget.value;
                                                        setFieldValue('additionalInfo', newAdditionalInfo);
                                                    }}
                                                    style={{ flex: 1, marginRight: 8 }}
                                                    resize="vertical"
                                                />
                                                {values.additionalInfo.length > 1 && (
                                                    <ActionIcon
                                                        color="red"
                                                        onClick={() => {
                                                            const newAdditionalInfo = [...values.additionalInfo];
                                                            newAdditionalInfo.splice(index, 1);
                                                            setFieldValue('additionalInfo', newAdditionalInfo);
                                                        }}
                                                    >
                                                        <IconTrash size={16} />
                                                    </ActionIcon>
                                                )}
                                            </Group>
                                        ))}
                                    </Stack>
                                </Stack>

                                {/* Action Buttons */}
                                <Group position="right" mt="md">
                                    <Button variant="default" onClick={handleCancelEdit}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Save</Button>
                                </Group>
                            </form>
                        </>
                    )}
                </div>

                {/* Action Buttons */}
                {!isEditing && (
                    <Group position="right" mt="md">
                        <Button variant="default" onClick={close}>
                            Close
                        </Button>
                        <Button onClick={handleEdit}>Edit</Button>
                    </Group>
                )}
            </Modal>
        </>
    );
}
