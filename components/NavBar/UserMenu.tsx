'use client';

import { useState } from 'react';
import {
    Avatar,
    Menu,
    UnstyledButton,
    Group,
    Text, useMantineColorScheme, Switch, rem,
} from '@mantine/core';
import {IconChevronDown, IconLogout, IconMoonStars, IconSettings, IconSun} from '@tabler/icons-react';
import { signOut } from '@/lib/auth-client';

export function UserMenu({ user }) {
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    
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
        <Menu
            width={200}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
        >
            <Menu.Target>
                <UnstyledButton>
                    <Group gap={7}>
                        <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                        <Text fw={500} size="sm" lh={1} mr={3}>
                            {user.name}
                        </Text>
                        <IconChevronDown size={12} stroke={1.5} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
                    Account settings
                </Menu.Item>
                <Menu.Item>
                    <Group position="apart">
                        <Text size="sm">Dark mode</Text>
                        <Switch
                            checked={dark}
                            onChange={() => toggleColorScheme()}
                            size="md"
                            onLabel={<IconSun size={rem(16)} stroke={2.5} color="yellow" />}
                            offLabel={<IconMoonStars size={rem(16)} stroke={2.5} color="blue" />}
                        />
                    </Group>
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconLogout size={16} stroke={1.5} />}
                    onClick={handleLogout}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}