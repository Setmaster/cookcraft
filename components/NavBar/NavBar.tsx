import { Box, Group } from '@mantine/core';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { UserMenu } from './UserMenu';
import { AuthButtons } from './AuthButtons';
import { MobileMenu } from './MobileMenu';
import classes from './NavBar.module.css';

export async function NavBar() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return (
        <Box pb={0}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <Group h="100%" gap={0} visibleFrom="sm">
                        <a href="/" className={classes.link}>Home</a>
                        {session && (
                            <a href="/recipes" className={classes.link}>Recipes</a>
                        )}
                        <a href="/faq" className={classes.link}>FAQ</a>
                        <a href="/about" className={classes.link}>About</a>
                    </Group>

                    {session ? <UserMenu user={session.user} /> : <AuthButtons />}

                    <MobileMenu session={session} />
                </Group>
            </header>
        </Box>
    );
}