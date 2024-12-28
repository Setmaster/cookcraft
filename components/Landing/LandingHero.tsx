import { Button, Container, Overlay, Text, Title } from '@mantine/core';
import classes from './LandingHero.module.css';

export function LandingHero() {
    return (
        <div className={classes.hero}>
            <Overlay
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
                opacity={1}
                zIndex={0}
            />
            <Container className={classes.container} size="md">
                <Title className={classes.title}>Something something food food food food</Title>
                <Text className={classes.description} size="xl" mt="xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Text>

                <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
                    Get a new recipe now
                </Button>
            </Container>
        </div>
    );
}