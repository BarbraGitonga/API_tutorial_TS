import type { ExtractTablesWithRelations } from "drizzle-orm";

import {
    drizzle,
    type NodePgDatabase,
    type NodePgTransaction,
} from "drizzle-orm/node-postgres";
import pg from "pg";

import env from "@/env";

import * as schema from "./schema/schema";

export { schema };
const { Client, Pool } = pg;
export { Client, Pool };
export * from "drizzle-orm";
export { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";

export type Database = NodePgDatabase<typeof schema>;

export type Transaction = NodePgTransaction<
    typeof schema,
    ExtractTablesWithRelations<typeof schema>
>;

export const db = drizzle(
    new Pool({
        connectionString: env.DATABASE_URL,
    }),
);
