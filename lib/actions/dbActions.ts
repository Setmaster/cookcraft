'use server'

import {getAllUsers, seedUsers, deleteAllUsers, updateFirstUserAge} from "@/lib/db";

function handleError(actionName: string, error: any) {
    console.error(`Error during ${actionName}:`, error);
    throw new Error(`Error during ${actionName}`);
}

export async function seedUsersA() {
    try {
        await seedUsers();
        return { message: 'Users seeded successfully' };
    } catch (error) {
        handleError('seeding users', error);
    }
}

export async function getAllUsersA() {
    try {
        const users = await getAllUsers();
        return users;
    } catch (error) {
        handleError('retrieving users', error);
    }
}

export async function updateFirstUserAgeA(newAge: number) {
    try {
        await updateFirstUserAge(newAge);
        return { message: `First user's age updated to ${newAge} successfully` };
    } catch (error) {
        handleError('updating first user age', error);
    }
}

export async function deleteAllUsersA() {
    try {
        await deleteAllUsers();
        return { message: 'All users deleted successfully' };
    } catch (error) {
        handleError('deleting users', error);
    }
}