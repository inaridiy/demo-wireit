import type { JSONParsed } from "hono/utils/types";
import { z } from "zod";

export interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: Date;
}

export const serializeTodo = (todo: Todo) => {
	return {
		id: todo.id,
		title: todo.title,
		completed: todo.completed,
		createdAt: todo.createdAt.toISOString(),
	};
};

export const deserializeTodo = (todo: JSONParsed<Todo>) => {
	return {
		id: todo.id,
		title: todo.title,
		completed: todo.completed,
		createdAt: new Date(todo.createdAt),
	};
};

export const createTodoSchema = z.object({
	title: z.string().min(1, "Title is required").max(100, "Title is too long"),
});

export const updateTodoSchema = z
	.object({
		title: z.string().min(1).max(100).optional(),
		completed: z.boolean(),
	})
	.refine((data) => data.title !== undefined || data.completed !== undefined, {
		message: "At least one field must be provided",
	});
