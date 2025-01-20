import index from "@/routes/index.routes";

import configureOpenAPI from "./lib/configure_open_api";
import createApp from "./lib/create_app";
import tasks from "./routes/tasks/tasks.index";

const app = createApp();

const routes = [
    index,
    tasks,
];
configureOpenAPI(app);

routes.forEach((route) => {
    app.route("/", route);
});

export default app;
