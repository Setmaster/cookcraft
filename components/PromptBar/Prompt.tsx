'use client';

import { useState } from 'react';
import {
    ActionIcon,
    Container,
    TextInput,
    useMantineTheme,
    Loader,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import classes from './Prompt.module.css';

interface PromptProps {
    onRecipeGenerated: () => void;
}

export const Prompt = ({ onRecipeGenerated }: PromptProps) => {
    const [value, setValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const theme = useMantineTheme();

    const handleSubmit = async () => {
        if (!value.trim()) {
            return;
        }
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ingredientsList: value.split(',').map((s) => s.trim()),
                }),
            });

            if (!response.ok) {
                let errorMessage = 'Failed to generate recipe';
                
                const errorText = await response.text();

                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.error || errorMessage;
                } catch {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            console.log('Recipe generated and saved successfully.');

            // Clear the input field
            setValue('');

            // Refresh the recipes listing
            onRecipeGenerated();
        } catch (error) {
            console.error('Error during recipe generation:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <Container size={'md'}>
            <TextInput
                size="xl"
                variant="filled"
                label="Generate new recipe"
                placeholder="Type the ingredients here"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                onKeyDown={handleKeyDown}
                disabled={isSubmitting}
                radius="xl"
                rightSectionWidth={60}
                rightSection={
                    <ActionIcon
                        size={58}
                        radius="xl"
                        color={theme.primaryColor}
                        variant="filled"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={classes.promptButton}
                    >
                        {isSubmitting ? (
                            <Loader size={28} color="blue" />
                        ) : (
                            <IconArrowRight size={18} stroke={1.5} />
                        )}
                    </ActionIcon>
                }
                classNames={{ label: classes.centeredLabel }}
            />
        </Container>
    );
};