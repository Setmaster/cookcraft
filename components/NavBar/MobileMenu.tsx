'use client';

import { useState } from 'react';
import { Burger, Drawer, ScrollArea, Divider, Group, Button } from '@mantine/core';
import classes from './NavBar.module.css';
import { AuthModal } from '@/components/Authentication/AuthModal';
import { signOut } from '@/lib/auth-client';

export function MobileMenu({ session }) {
    const [drawerOpened, setDrawerOpened] = useState(false);
    const [authModalOpened, setAuthModalOpened] = useState(false);
    const [initialForm, setInitialForm] = useState<'login' | 'signup'>('login');

    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = '/';
                },
            },
        });
    };

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
            <Burger opened={drawerOpened} onClick={() => setDrawerOpened(!drawerOpened)} hiddenFrom="sm" />

            <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                size="100%"
                title="Pages"
                padding="md"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea style={{ height: 'calc(100vh - 80px)' }} mx="-md">
                    <Divider my="sm" />

                    <a href="/" className={classes.link}>
                        Home
                    </a>
                    {session && (
                        <a href="/recipes" className={classes.link}>
                            Recipes
                        </a>
                    )}
                    <a href="/faq" className={classes.link}>
                        FAQ
                    </a>
                    <a href="/about" className={classes.link}>
                        About
                    </a>

                    <Divider my="sm" />

                </ScrollArea>
            </Drawer>
        </>
    );
}