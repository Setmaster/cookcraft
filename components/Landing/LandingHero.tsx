import { Button, Container, Overlay, Title } from '@mantine/core';
import classes from './LandingHero.module.css';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthModal } from '@/components/Authentication/AuthModal';

export default function LandingHero() {
    const { data: session } = authClient.useSession();
    const [authModalOpened, setAuthModalOpened] = useState(false);

    const router = useRouter();

    const handleButtonClick = () => {
        if (session) {
            router.push('/recipes');
        } else {
            setAuthModalOpened(true);
        }
    };

    return (
        <div className={classes.hero}>
            <Overlay
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 40%)"
                opacity={1}
                zIndex={0}
            />
            <Container className={classes.container} size="md">
                <Title className={classes.title}>
                    Got some ingredients sitting around? Ask our AI-powered recipe maker and start making
                    your meal now!
                </Title>

                <Button
                    variant="gradient"
                    size="xl"
                    radius="xl"
                    className={classes.control}
                    onClick={handleButtonClick}
                >
                    Create a recipe now
                </Button>

                <AuthModal
                    opened={authModalOpened}
                    onClose={() => setAuthModalOpened(false)}
                    initialForm="login"
                />
            </Container>
        </div>
    );
}