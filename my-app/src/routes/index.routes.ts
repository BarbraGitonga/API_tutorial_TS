import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";

import { createRouter } from "@/lib/create_app";
import { createRoute } from "@hono/zod-openapi";

const router = createRouter()
    .openapi(
        // route
        createRoute({
            tags: ["Index"],
            method: "get",
            path: "/",
            responses: {
                [HttpStatusCodes.OK]: jsonContent(
                    z.object({
                        message: z.string(),
                    }),
                    "Tasks API Index",
                ),
            },
        }),
        // Handler
        (c) => {
            return c.json({
                message: "Tasks API",
            }, HttpStatusCodes.OK);
        },
    );

export default router;
