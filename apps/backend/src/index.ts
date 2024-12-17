import { cors } from "hono/cors";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { type Todo, createTodoSchema, serializeTodo, updateTodoSchema } from "shared";
import { createHonoApp } from "./create-hono";
import { todos } from "./schema";
import { eq } from "drizzle-orm";

const paramsSchema = z.object({
	id: z.string().min(1),
});

const app = createHonoApp()
	.use("/*", cors())
	.get("/api/todos", async (c) => {
		const results = (await c.get("db").query.todos.findMany({
			orderBy: (todos, { desc }) => [desc(todos.createdAt)],
			limit: 100,
		})) satisfies Todo[];
		return c.json(results.map(serializeTodo));
	})
	.post("/api/todos", zValidator("json", createTodoSchema), async (c) => {
		const { title } = c.req.valid("json");

		const todoId = crypto.randomUUID();
		const todo = { id: todoId, title, completed: false, createdAt: new Date() };
		const results = (await c.get("db").insert(todos).values(todo).returning()) satisfies Todo[];

		return c.json(serializeTodo(results[0]), 201);
	})
	.put("/api/todos/:id", zValidator("json", updateTodoSchema), zValidator("param", paramsSchema), async (c) => {
		const { id } = c.req.valid("param");
		const { title, completed } = c.req.valid("json");

		const existing = await c.get("db").query.todos.findFirst({ where: (todos, { eq }) => eq(todos.id, id) });
		if (!existing) return c.json({ error: "Todo not found" }, 404);

		console.log(title, completed);

		const results = (await c
			.get("db")
			.update(todos)
			.set({ title, completed })
			.where(eq(todos.id, id))
			.returning()) satisfies Todo[];

		return c.json(serializeTodo(results[0]));
	})
	.delete("/api/todos/:id", zValidator("param", paramsSchema), async (c) => {
		const { id } = c.req.valid("param");

		const { success } = await c.get("db").delete(todos).where(eq(todos.id, id));

		if (!success) return c.json({ error: "Failed to delete todo" }, 500);

		return c.json({ success: true });
	});

export default app;
export type App = typeof app;
