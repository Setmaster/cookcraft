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
import classes from './Signup.module.css';

export function Signup() {
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
                <TextInput label="Name" placeholder="John Doe" required />
                <TextInput label="Email" placeholder="you@mantine.dev" required mt="md"/>
                <PasswordInput label="Password" placeholder="Enter a password" required mt="md" />
                <PasswordInput label="Password Confirmation" placeholder="Enter your password again" required mt="md" />
                <Button fullWidth mt="xl">
                    Sign up
                </Button>
            </Paper>
        </Container>
    );
}