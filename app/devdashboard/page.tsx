'use client';
import {Button} from '@mantine/core';
import {useRouter} from 'next/navigation';
import {deleteAllUsersA, getAllUsersA, seedUsersA, updateFirstUserAgeA} from "@/lib/actions/dbActions";

export default function DevDashboard() {
    const router = useRouter();

    const handleButtonClick = () => {
        // Navigate to a non-existent page to test the 404 page
        router.push('/non-existent-page');
    };

    const handleSeedUsers = async () => {
        // Call the seedUsersA action
        const response = await seedUsersA();
        console.log(response);
    }

    const handleGetAllUsers = async () => {
        // Call the GetAllUsersA action
        const response = await getAllUsersA();
        console.log(response);
    }

    const handleDeleteAllUsers = async () => {
        // Call the deleteAllUsersA action
        const response = await deleteAllUsersA();
        console.log(response);
    }
    
    const handleUpdateFirstUserAge = async () => {
        // Call the updateFirstUserAgeA action
        const response = await updateFirstUserAgeA(90);
        console.log(response);
    }

    return (
        <main>
            <h1>This is the dev dashboard page</h1>
            <Button onClick={handleButtonClick}>
                404 Error Test
            </Button>
            <Button onClick={handleSeedUsers}>
                Seed Users Test
            </Button>
            <Button onClick={handleGetAllUsers}>
                Get Users Test
            </Button>
            <Button onClick={handleUpdateFirstUserAge}>
                Update First User
            </Button>
            <Button onClick={handleDeleteAllUsers}>
                Delete Users Test
            </Button>
        </main>
    );
}
