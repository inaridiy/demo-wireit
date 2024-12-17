import { z } from "zod";

export const todoSchema = z.object({
	id: z.number(),
	title: z.string(),
	completed: z.boolean(),
	created_at: z.string(),
});

export const createTodoSchema = z.object({
	title: z.string().min(1, "Title is required").max(100, "Title is too long"),
});

export const updateTodoSchema = z
	.object({
		title: z.string().min(1).max(100).optional(),
		completed: z.boolean().optional(),
	})
	.refine((data) => data.title !== undefined || data.completed !== undefined, {
		message: "At least one field must be provided",
	});
