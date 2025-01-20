import { createRouter } from "@/lib/create_app";

import * as handlers from "./tasks.handlers";
import * as routes from "./tasks.routes";

const tasks = createRouter()
    .openapi(routes.list, handlers.list);

export default tasks;
