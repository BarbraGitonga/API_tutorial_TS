import {
    boolean,
    pgTable,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const tasks = pgTable(
    "tasks",
    {
        id: serial("id").primaryKey(),
        name: text().notNull(),
        done: boolean().default(false),
        created_at: timestamp().defaultNow(),
        updated_at: timestamp().defaultNow(),
    },
);

export const selectTasksSchema = createSelectSchema(tasks);
export const insertTaskSchema = createInsertSchema(tasks)
    .omit(
        { id: true, created_at: true, updated_at: true },
    )
    .required({
        done: true,
    });

export const patchTasksSchema = insertTaskSchema.partial();
