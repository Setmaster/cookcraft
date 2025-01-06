import { drizzle } from 'drizzle-orm/node-postgres';
import { user } from '../schema';
// import logger from '../../utils/logger';
import users from './seedUserData.json';

const db = drizzle(process.env.DATABASE_URL!);

export async function seedUsers() {
    await db.transaction(async (trx) => {
        try {
            for (const user of users) {
                await trx.insert(user).values(user);
            }
            // logger.info('Users have been seeded successfully.', {
            //     status: 'success',
            //     timestamp: new Date().toISOString(),
            // });
        } catch (error) {
            // logger.error('Error seeding users', {
            //     message: error,
            //     users,
            // });
            throw error;
        }
    });
}
