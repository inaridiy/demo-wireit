import { createFactory } from "hono/factory";
import type { HonoEnv } from "./types";
import { createBackendRpc } from "./libs/backend-rpc";

const factory = createFactory<HonoEnv>({
	initApp: (app) => {
		app.use(async (c, next) => {
			c.set("backend", createBackendRpc(c.env));
			await next();
		});
	},
});

export const createHonoApp = factory.createApp;
