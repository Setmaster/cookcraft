'use client';

import { useState } from 'react';
import { Burger, Drawer, ScrollArea, Divider, Group, Button } from '@mantine/core';
import classes from './NavBar.module.css';
import LoginModal from '@/components/Authentication/LoginModal';
import SignupModal from '@/components/Authentication/SignupModal';
import { signOut } from '@/lib/auth-client';

export function MobileMenu({ session }) {
    const [drawerOpened, setDrawerOpened] = useState(false);

    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = '/';
                },
            },
        });
    };

    return (
        <>
            <Burger opened={drawerOpened} onClick={() => setDrawerOpened(!drawerOpened)} hiddenFrom="sm" />

            <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h="calc(100vh - 80px)" mx="-md">
                    <Divider my="sm" />

                    <a href="/" className={classes.link}>Home</a>
                    {session && (
                        <a href="/recipes" className={classes.link}>Recipes</a>
                    )}
                    <a href="/faq" className={classes.link}>FAQ</a>
                    <a href="/devdashboard" className={classes.link}>Devdashboard</a>

                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        {!session ? (
                            <>
                                <LoginModal />
                                <SignupModal />
                            </>
                        ) : (
                            <Button variant="default" onClick={handleLogout}>Logout</Button>
                        )}
                    </Group>
                </ScrollArea>
            </Drawer>
        </>
    );
}