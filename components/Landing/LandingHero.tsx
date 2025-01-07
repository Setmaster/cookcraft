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
                <Title className={classes.title}>Got some ingredients sitting around? Ask our AI-powered recipe maker and start making your meal now! </Title>

                <Button variant="gradient" size="xl" radius="xl" className={classes.control}>
                    Create a recipe now
                </Button>
            </Container>
        </div>
    );
}