import type { BackendRpc } from "./libs/backend-rpc";

export interface HonoEnv {
	Bindings: CloudflareBindings;
	Variables: {
		backend: BackendRpc;
	};
}
