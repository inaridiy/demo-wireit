import { hc } from "hono/client";
import type { App as BackendApp } from "backend";

export const createBackendRpc = (env: CloudflareBindings) => {
	return hc<BackendApp>("https://worker.com", {
		fetch: env.BACKEND_WORKER.fetch.bind(env.BACKEND_WORKER),
	});
};

export type BackendRpc = ReturnType<typeof createBackendRpc>;
