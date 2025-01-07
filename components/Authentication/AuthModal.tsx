'use client';
import { useState } from 'react';
import { Modal } from '@mantine/core';
import { Login } from './Login';
import { Signup } from './Signup';

interface AuthModalProps {
    opened: boolean;
    onClose: () => void;
    initialForm?: 'login' | 'signup';
}

export function AuthModal({ opened, onClose, initialForm = 'login' }: AuthModalProps) {
    const [authForm, setAuthForm] = useState<'login' | 'signup'>(initialForm);

    const handleToggleForm = () => {
        setAuthForm((prev) => (prev === 'login' ? 'signup' : 'login'));
    };

    return (
        <Modal opened={opened} onClose={onClose}>
            {authForm === 'login' ? (
                <Login onToggleAuthForm={handleToggleForm} />
            ) : (
                <Signup onToggleAuthForm={handleToggleForm} />
            )}
        </Modal>
    );
}
