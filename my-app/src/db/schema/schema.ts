import {
    boolean,
    pgTable,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("tasks", {
    id: serial("id").primaryKey(),
    name: text().notNull(),
    done: boolean().default(false),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp().defaultNow(),
});
