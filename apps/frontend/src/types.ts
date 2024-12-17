import type { Client as BackendClient } from "backend";

export interface HonoEnv {
	Bindings: CloudflareBindings;
	Variables: {
		backend: BackendClient;
	};
}
