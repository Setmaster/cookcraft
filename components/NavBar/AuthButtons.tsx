'use client';
import { useState } from 'react';
import { Button, Group } from '@mantine/core';
import { AuthModal } from '../Authentication/AuthModal';

export function AuthButtons() {
    const [authModalOpened, setAuthModalOpened] = useState(false);
    const [initialForm, setInitialForm] = useState<'login' | 'signup'>('login');

    const openLoginModal = () => {
        setInitialForm('login');
        setAuthModalOpened(true);
    };

    const openSignupModal = () => {
        setInitialForm('signup');
        setAuthModalOpened(true);
    };

    return (
        <>
            <Group>
                <Button variant="default" onClick={openLoginModal}>
                    Login
                </Button>
                <Button variant="default" onClick={openSignupModal}>
                    Sign Up
                </Button>
            </Group>

            <AuthModal
                opened={authModalOpened}
                onClose={() => setAuthModalOpened(false)}
                initialForm={initialForm}
            />
        </>
    );
}