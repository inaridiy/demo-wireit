import { createHonoApp } from "./create-hono";

const app = createHonoApp();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

export default app;
