import type { ZodError } from "zod";

import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

const envSchema = z.object({
    NODE_ENV: z.string().default("development"),
    PORT: z.coerce.number().default(4000),
    LOG_LEVEL: z.enum([
        "fatal",
        "error",
        "warn",
        "info",
        "debug",
        "trace",
    ]),
    DATABASE_URL: z.string(),
});

export type env = z.infer<typeof envSchema>;

// eslint-disable-next-line import/no-mutable-exports, ts/no-redeclare
let env: env;

try {
    // eslint-disable-next-line node/no-process-env
    env = envSchema.parse(process.env);
}
catch (e) {
    const error = e as ZodError;
    console.error("Invalid env:");
    console.error(error.flatten().fieldErrors);
    process.exit(1);
}
export default env;
