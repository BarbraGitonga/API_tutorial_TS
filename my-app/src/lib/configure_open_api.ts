import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types";

import packageJSON from "../../package.json";

export default function configureOpenAPI(app: AppOpenAPI) {
    app.doc("/docs", {
        openapi: "3.0.0",
        info: {
            version: packageJSON.version,
            title: "Tasks API",
        },
    });

    app.get(
        "/reference",
        apiReference({
            theme: "bluePlanet",
            layout: "classic",
            defaultHttpClient: {
                targetKey: "javascript",
                clientKey: "fetch",
            },
            spec: {
                url: "/docs",
            },
        }),
    );
}
