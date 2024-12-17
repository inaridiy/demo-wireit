import type { DrizzleD1Database } from "drizzle-orm/d1";
import type * as schema from "./schema";

export interface HonoEnv {
	Bindings: CloudflareBindings;
	Variables: {
		db: DrizzleD1Database<typeof schema>;
	};
}
