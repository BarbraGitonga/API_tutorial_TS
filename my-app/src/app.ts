import { onError } from "stoker/middlewares";

import { OpenAPIHono } from "@hono/zod-openapi";

import { pinologger } from "./middlewares/pino_logger";

const app = new OpenAPIHono();
app.use(pinologger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/error", (c) => {
  c.status(422);
  c.var.logger.info("Wow! Log Here!");
  throw new Error("Oh No!");
});

app.notFound((c) => {
  return c.text("Page not found", 404);
});
app.onError(onError);
export default app;
