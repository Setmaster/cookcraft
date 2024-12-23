'use client';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function DevDashboard() {
    const router = useRouter();

    const handleButtonClick = () => {
        // Navigate to a non-existent page to test the 404 page
        router.push('/non-existent-page');
    };

    return (
        <main>
            <h1>This is the dev dashboard page</h1>
            <Button onClick={handleButtonClick}>
                404 Error Test
            </Button>
        </main>
    );
}
