import env from "@/env";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(env.DATABASE_URL);

const result = await db.execute("select 1");
