import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/lib/types";

import { db } from "@/db";
import { tasks } from "@/db/schema";

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute } from "./tasks.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const tasksList = await db.select().from(tasks);
    return c.json(tasksList, HttpStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
    const task = c.req.valid("json");
    const [insertedTask] = await db.insert(tasks).values(task).returning();
    return c.json(insertedTask, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
    const { id } = c.req.valid("param"); // Validate the parameter
    const task = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);

    if (!task || task.length === 0) {
        return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
    }

    return c.json(task[0], HttpStatusCodes.OK); // Return the first result
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
    const { id } = c.req.valid("param");
    const updates = c.req.valid("json");
    const task = await db.update(tasks)
        .set(updates)
        .where(eq(tasks.id, id))
        .returning();

    if (!task || task.length === 0) {
        return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
    }

    return c.json(task[0], HttpStatusCodes.OK); // Return the first result
};