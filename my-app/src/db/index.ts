import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema"; // Import all schema exports
import env from "@/env";

export type Database = NodePgDatabase<typeof schema>; // Connect schema types to the database
const { Client, Pool } = pg;
export { Client, Pool };
export const db: Database = drizzle(
    new Pool({
        connectionString: env.DATABASE_URL,
    }),
);
