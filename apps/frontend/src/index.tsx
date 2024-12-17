import type { FC } from "hono/jsx";
import { createHonoApp } from "./create-hono";
import { deserializeTodo, type Todo } from "shared";

const IndexPage: FC<{ todos: Todo[] }> = ({ todos }) => {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Todo App</title>
				<link rel="stylesheet" href="https://fonts.xz.style/serve/inter.css" />
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css" />
			</head>
			<body>
				<h1>Todo App</h1>

				<section>
					<h2>Create Todo</h2>
					<form method="post" action="/">
						<input type="hidden" name="_method" value="POST" />
						<label htmlFor="title">Title:</label>
						<input type="text" name="title" id="title" required placeholder="Enter todo title..." />
						<button type="submit">Create</button>
					</form>
				</section>

				<section>
					<h2>Todos</h2>
					<table>
						<thead>
							<tr>
								<th>Title</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{todos.map((todo) => (
								<tr key={todo.id}>
									<td>{todo.title}</td>
									<td>
										<div class="todo-actions">
											<form method="post" action="/" class="todo-update-form">
												<input type="hidden" name="_method" value="PUT" />
												<input type="hidden" name="id" value={todo.id} />
												<input type="text" name="title" value={todo.title} />
												<label>
													<input type="checkbox" name="completed" checked={todo.completed} />
													Completed
												</label>
												<button type="submit">Update</button>
											</form>
											<form method="post" action="/" style="margin: 0;">
												<input type="hidden" name="_method" value="DELETE" />
												<input type="hidden" name="id" value={todo.id} />
												<button type="submit" value="DELETE">
													Delete
												</button>
											</form>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</section>
			</body>
		</html>
	);
};

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
