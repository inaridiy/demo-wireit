import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable(
	"todos",
	{
		id: text("id").primaryKey(),
		title: text("title").notNull(),
		completed: integer("completed", { mode: "boolean" }).notNull(),
		createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	},
	(t) => [index("created_at_idx").on(t.createdAt)],
);
