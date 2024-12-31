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

// Import the server action
import { generateAndSaveRecipe } from '@/lib/actions/dbActions';

export const Prompt = () => {
    const [value, setValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const theme = useMantineTheme();

    // Function to handle submission using server-side action
    const handleSubmit = async () => {
        if (!value.trim()) {
            return; // Do nothing if the input is empty
        }
        setIsSubmitting(true); // Disable input and button

        try {
            // Call the server-side function directly
            await generateAndSaveRecipe(value.split(',').map((s) => s.trim()), 1);

            console.log('Recipe generated and saved successfully.');

            // Clear the input field
            setValue('');
        } catch (error) {
            console.error('Error during recipe generation:', error);
        } finally {
            setIsSubmitting(false); // Re-enable input and button
        }
    };

    // Handle Enter key press
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
