'use client';

import { Group } from '@mantine/core';
import LoginModal from '@/components/Authentication/LoginModal';
import SignupModal from '@/components/Authentication/SignupModal';

export function AuthButtons() {
    return (
        <Group visibleFrom="sm">
            <LoginModal />
            <SignupModal />
        </Group>
    );
}