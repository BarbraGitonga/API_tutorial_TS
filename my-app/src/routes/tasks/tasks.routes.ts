import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { insertTaskSchema, patchTasksSchema, selectTasksSchema } from "@/db/schema/tasks";
import { createRoute, z } from "@hono/zod-openapi";
import { notFoundSchema } from "@/lib/constants";

const tags = ["Tasks"];

export const list = createRoute({
    tags,
    path: "/tasks.list",
    method: "get",
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            z.array(selectTasksSchema),
            "The list of tasks",
        ),
    },
});

export const getOne = createRoute({
    tags,
    path: "/tasks/{id}",
    method: "get",
    request: {
        params: IdParamsSchema,
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            selectTasksSchema,
            "Requested task",
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(IdParamsSchema),
            "Invalid Id",
        ),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            notFoundSchema,
            "Task not found",
        ),
    },
});

export const create = createRoute({
    tags,
    path: "/tasks.create",
    method: "post",
    request: {
        body: jsonContentRequired(
            insertTaskSchema,
            "Task to create",
        ),
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            selectTasksSchema,
            "The created task",
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
            createErrorSchema(insertTaskSchema),
            "Invalid input",
        ),
    },
});

export const patch = createRoute({
    tags,
    path: "/tasks/{id}",
    method: "patch",
    request: {
        params: IdParamsSchema,
        body: jsonContentRequired(
            patchTasksSchema,
            "Task updates",
        ),
    },
    responses: {
        [HttpStatusCodes.OK]: jsonContent(
            selectTasksSchema,
            "The updated task",
        ),
        [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
            [
                createErrorSchema(patchTasksSchema),
                createErrorSchema(IdParamsSchema),
            ],
            "Invalid input",
        ),
        [HttpStatusCodes.NOT_FOUND]: jsonContent(
            notFoundSchema,
            "Does not exist",
        )
    },
});


export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;