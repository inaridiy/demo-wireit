import { createHonoApp } from "./create-hono";
import { deserializeTodo } from "shared";
import { IndexPage } from "./routes";

const app = createHonoApp()
	.get("/", async (c) => {
		const response = await c.get("backend").api.todos.$get();
		const todos = await response.json();

		return c.html(<IndexPage todos={todos.map(deserializeTodo)} />);
	})
	.post("/", async (c) => {
		const formData = await c.req.formData();
		const method = formData.get("_method");

		if (method === "POST") {
			const title = formData.get("title") as string;
			await c.get("backend").api.todos.$post({ json: { title } });
		} else if (method === "PUT") {
			const id = formData.get("id") as string;
			const title = formData.get("title") as string;
			const completed = formData.get("completed") === "on";

			await c.get("backend").api.todos[":id"].$put({ param: { id }, json: { title, completed } });
		} else if (method === "DELETE") {
			const id = formData.get("id") as string;
			await c.get("backend").api.todos[":id"].$delete({ param: { id: id } });
		}

		return c.redirect("/");
	});

export default app;
