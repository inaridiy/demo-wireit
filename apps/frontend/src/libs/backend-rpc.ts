import { hcWithType } from "backend";

export const createBackendRpc = (env: CloudflareBindings) => {
	return hcWithType("https://worker.com", {
		fetch: env.BACKEND_WORKER.fetch.bind(env.BACKEND_WORKER),
	});
};

export type BackendRpc = ReturnType<typeof createBackendRpc>;
