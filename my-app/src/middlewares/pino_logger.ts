import { pinoLogger } from "hono-pino";
import pino from "pino";
import PinoPretty from "pino-pretty";

import env from "@/env";

export function pinologger() {
    return pinoLogger({
        pino: pino({
            level: env.LOG_LEVEL || "info",
        }, env.NODE_ENV === "production" ? undefined : PinoPretty()),
        http: {
            reqId: () => crypto.randomUUID(),
        },
    });
}
