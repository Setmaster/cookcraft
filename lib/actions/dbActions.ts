'use server'
import logger from '@/utils/logger';
import {getAllUsers, seedUsers, deleteAllUsers} from "@/lib/db";

function handleError(actionName: string, error: any) {
    logger.error('Error during ' + actionName, {
        message: error,
        additionalInfo: actionName
      });
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

export async function deleteAllUsersA() {
    try {
        await deleteAllUsers();
        return { message: 'All users deleted successfully' };
    } catch (error) {
        handleError('deleting users', error);
    }
}