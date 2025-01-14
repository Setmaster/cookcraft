import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import {useState} from 'react';
import {signIn} from '@/lib/auth-client';
import classes from './Login.module.css';

interface LoginProps {
    onToggleAuthForm: () => void;
}

export function Login({onToggleAuthForm}: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async () => {
        try {
            const {error} = await signIn.email({email, password});
            if (error) throw new Error(error.message);
            // Redirect to recipes page on success
            window.location.href = '/recipes';
        } catch (err : unknown) {
            // @ts-ignore
            setError(err.message);
        }
    };

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button" onClick={onToggleAuthForm}>
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput
                    label="Email"
                    placeholder="you@mantine.dev"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    mt="md"
                />
                <Group justify="space-between" mt="lg">
                    <Checkbox label="Remember me"/>
                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor>
                </Group>
                {error && <Text color="red">{error}</Text>}
                <Button fullWidth mt="xl" onClick={handleSignIn}>
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
}