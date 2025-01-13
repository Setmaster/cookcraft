'use client';

import { useState } from 'react';
import { Burger, Drawer, ScrollArea, Divider } from '@mantine/core';
import classes from './NavBar.module.css';

export function MobileMenu({ session } : { session: any }) {
    const [drawerOpened, setDrawerOpened] = useState(false);

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