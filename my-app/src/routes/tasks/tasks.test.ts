import { testClient } from "hono/testing";
import { describe, expect, expectTypeOf, it } from "vitest";

import createApp, { createTestApp } from "@/lib/create_app";

import tasks from "./tasks.index";

describe("tasks list", () => {
    it("responds with an array", async () => {
        const testRouter = createTestApp(tasks);
        const response = await testRouter.request("/tasks.list");
        const result = await response.json();
        // eslint-disable-next-line no-console
        console.log(result);
        expectTypeOf(result).toBeArray();
    });

    it("responds with an array again", async () => {
        const client = testClient(createApp().route("/", tasks));
        const response = await client.tasks.$get();
        const json = await response.json();
        expectTypeOf(json).toBeArray();
    });
});
