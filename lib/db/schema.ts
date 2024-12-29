import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

// users table
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
});

// recipes table
export const recipesTable = pgTable("recipes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    ingredients: varchar({ length: 255 }).notNull(),
    userId: integer("user_id").notNull().references(() => usersTable.id),
    dateCreated: timestamp('date_created').defaultNow().notNull(),
});

