'use client';

import {
    Anchor,
    Button,
    Container,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { useState } from 'react';
import { signUp } from '@/lib/auth-client';
import classes from './Signup.module.css';

export function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const { data, error } = await signUp.email({ email, password, name });
            console.log("info:", email, password, name);
            if (error) throw new Error(error.message);
            // Redirect to recipes page on success
            window.location.href = '/recipes';
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Create an Account!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Already have an account?{' '}
                <Anchor size="sm" component="button">
                    Login
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput
                    label="Name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <TextInput
                    label="Email"
                    placeholder="you@mantine.dev"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    mt="md"
                />
                <PasswordInput
                    label="Password"
                    placeholder="Enter a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    mt="md"
                />
                <PasswordInput
                    label="Password Confirmation"
                    placeholder="Enter your password again"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    mt="md"
                />
                {error && <Text color="red">{error}</Text>}
                <Button fullWidth mt="xl" onClick={handleSignUp}>
                    Sign up
                </Button>
            </Paper>
        </Container>
    );
}
