import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { todoSchema, createTodoSchema, updateTodoSchema } from "shared";

type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();
app.use("/*", cors());

const paramsSchema = z.object({
	id: z.string().min(1),
});

// TODOの一覧を取得
app.get("/api/todos", async (c) => {
	const { results } = await c.env.DB.prepare("SELECT * FROM todos ORDER BY created_at DESC").all();
	const validResults = results.map((result) => todoSchema.parse(result));
	return c.json(validResults);
});

// TODOを作成
app.post("/api/todos", zValidator("json", createTodoSchema), async (c) => {
	const { title } = c.req.valid("json");

	const { success } = await c.env.DB.prepare("INSERT INTO todos (title) VALUES (?)").bind(title).run();

	if (!success) {
		return c.json({ error: "Failed to create todo" }, 500);
	}

	const { results } = await c.env.DB.prepare("SELECT * FROM todos WHERE id = last_insert_rowid()").all();
	const validResults = results.map((result) => todoSchema.parse(result));

	return c.json(validResults[0], 201);
});

// TODOを更新
app.patch("/api/todos/:id", zValidator("json", updateTodoSchema), zValidator("param", paramsSchema), async (c) => {
	const { id } = c.req.valid("param");
	const { title, completed } = c.req.valid("json");

	const updates: string[] = [];
	const values: (string | boolean)[] = [];

	if (title !== undefined) {
		updates.push("title = ?");
		values.push(title);
	}
	if (completed !== undefined) {
		updates.push("completed = ?");
		values.push(completed);
	}

	const { success } = await c.env.DB.prepare(`UPDATE todos SET ${updates.join(", ")} WHERE id = ?`)
		.bind(...values, id)
		.run();

	if (!success) {
		return c.json({ error: "Failed to update todo" }, 500);
	}

	const { results } = await c.env.DB.prepare("SELECT * FROM todos WHERE id = ?").bind(id).all();
	const validResults = results.map((result) => todoSchema.parse(result));

	if (validResults.length === 0) {
		return c.json({ error: "Todo not found" }, 404);
	}

	return c.json(validResults[0]);
});

// TODOを削除
app.delete("/api/todos/:id", zValidator("param", paramsSchema), async (c) => {
	const { id } = c.req.valid("param");

	const { success } = await c.env.DB.prepare("DELETE FROM todos WHERE id = ?").bind(id).run();

	if (!success) {
		return c.json({ error: "Failed to delete todo" }, 500);
	}

	return c.json({ success: true });
});

export default app;
