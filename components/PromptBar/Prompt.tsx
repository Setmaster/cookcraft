'use client';

import { useState } from 'react';
import {
    ActionIcon,
    Container,
    TextInput,
    useMantineTheme,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import classes from './Prompt.module.css';
import { generateAndSaveRecipe } from '@/lib/actions/dbActions';

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
            await generateAndSaveRecipe(value.split(',').map((s) => s.trim()), 1);
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
                rightSectionWidth={42}
                rightSection={
                    <ActionIcon
                        size={32}
                        radius="xl"
                        color={theme.primaryColor}
                        variant="filled"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={classes.promptButton}
                    >
                        <IconArrowRight size={18} stroke={1.5} />
                    </ActionIcon>
                }
            />
        </Container>
    );
};
