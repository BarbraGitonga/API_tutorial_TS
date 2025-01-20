import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

import { pinologger } from "@/middlewares/pino_logger";
import { OpenAPIHono } from "@hono/zod-openapi";

import type { AppBindings } from "./types";

export function createRouter() {
    return new OpenAPIHono<AppBindings>({
        strict: false,
        defaultHook,
    });
}
export default function createApp() {
    const app = createRouter();
    app.use(serveEmojiFavicon("💙"));
    app.use(pinologger());

    app.notFound(notFound);
    app.onError(onError);
    return app;
}
