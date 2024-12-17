import { createFactory } from "hono/factory";
import type { HonoEnv } from "./types";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
const factory = createFactory<HonoEnv>({
	initApp: (app) => {
		app.use(async (c, next) => {
			c.set("db", drizzle(c.env.DB, { schema }));
			await next();
		});
	},
});

export const createHonoApp = factory.createApp;
