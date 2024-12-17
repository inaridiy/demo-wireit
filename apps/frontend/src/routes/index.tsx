import type { FC } from "hono/jsx";
import type { Todo } from "shared";

export const IndexPage: FC<{ todos: Todo[] }> = ({ todos }) => {
	return (
		<html lang="en" className="bg-gray-100">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Todo App</title>
				<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
			</head>
			<body className="font-sans">
				<main className="container mx-auto p-4">
					<header className="mb-8">
						<h1 className="font-bold text-3xl text-gray-800">Todo App</h1>
					</header>

					<section aria-labelledby="create-todo" className="mb-8 rounded bg-white p-6 shadow">
						<h2 id="create-todo" className="mb-4 font-semibold text-gray-700 text-xl">
							Create Todo
						</h2>
						<form method="post" action="/" className="form-container flex flex-col gap-4">
							<input type="hidden" name="_method" value="POST" />
							<div className="flex flex-col">
								<label htmlFor="title" className="mb-1 text-gray-600">
									Title:
								</label>
								<input
									type="text"
									name="title"
									id="title"
									required
									placeholder="Enter todo title..."
									className="rounded border p-2 focus:border-blue-400 focus:ring focus:ring-blue-200"
								/>
							</div>
							<button
								type="submit"
								className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:shadow-outline focus:outline-none"
							>
								Create
							</button>
						</form>
					</section>

					<section aria-labelledby="todo-list" className="rounded bg-white p-6 shadow">
						<h2 id="todo-list" className="mb-4 font-semibold text-gray-700 text-xl">
							Todos
						</h2>
						<table className="min-w-full table-auto">
							<thead className="bg-gray-200">
								<tr>
									<th className="px-4 py-2 text-left">Title</th>
									<th className="px-4 py-2 text-left">Actions</th>
								</tr>
							</thead>
							<tbody>
								{todos.map((todo) => (
									<tr key={todo.id} className="border-b">
										<td className="px-4 py-2">{todo.title}</td>
										<td className="px-4 py-2">
											<div className="todo-actions flex items-center gap-2">
												<form method="post" action="/" className="flex items-center gap-2">
													<input type="hidden" name="_method" value="PUT" />
													<input type="hidden" name="id" value={todo.id} />
													<input
														type="text"
														name="title"
														value={todo.title}
														placeholder="Edit title"
														className="rounded border p-1 focus:border-blue-400 focus:ring focus:ring-blue-200"
													/>
													<label className="flex items-center gap-1">
														<input
															type="checkbox"
															name="completed"
															checked={todo.completed}
															className="rounded border-gray-300 focus:ring-blue-300"
														/>
														<span className="text-gray-600 text-sm">Completed</span>
													</label>
													<button
														type="submit"
														className="rounded bg-green-500 px-2 py-1 font-bold text-sm text-white hover:bg-green-700 focus:shadow-outline focus:outline-none"
													>
														Update
													</button>
												</form>

												<form method="post" action="/" className="flex items-center">
													<input type="hidden" name="_method" value="DELETE" />
													<input type="hidden" name="id" value={todo.id} />
													<button
														type="submit"
														className="rounded bg-red-500 px-2 py-1 font-bold text-sm text-white hover:bg-red-700 focus:shadow-outline focus:outline-none"
													>
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
				</main>
			</body>
		</html>
	);
};
