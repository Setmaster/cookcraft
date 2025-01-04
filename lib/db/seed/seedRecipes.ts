import { drizzle } from 'drizzle-orm/node-postgres';
import { recipesTable } from '../schema';
// import logger from '../../utils/logger';
import recipes from './seedRecipesData.json';

const db = drizzle(process.env.DATABASE_URL!);

export async function seedRecipes() {
    await db.transaction(async (trx) => {
        try {
            for (const recipe of recipes) {
                const { userId, ...recipeData } = recipe;
                await trx.insert(recipesTable).values({
                    data: JSON.stringify(recipeData),
                    userId
                });
            }
            // logger.info('Recipes have been seeded successfully.', {
            //     status: 'success',
            //     timestamp: new Date().toISOString(),
            // });
        } catch (error) {
            // logger.error('Error seeding recipes', {
            //     message: error,
            //     recipes,
            // });
            throw error;
        }
    });
}
