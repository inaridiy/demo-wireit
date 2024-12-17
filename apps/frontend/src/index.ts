import { Hono } from "hono";
import { App as BackendApp } from "backend";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/message", (c) => {
	return c.text("Hello Hono!");
});

export default app;
