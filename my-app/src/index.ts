import { serve } from "@hono/node-server";

import app from "./app";
import env from "./env";

const port = env.PORT || 3000;

// eslint-disable-next-line no-console
console.log(`Server is running on http://localhost:${port}`);

serve({
    fetch: app.fetch,
    port,
});
