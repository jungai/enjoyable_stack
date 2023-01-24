import "dotenv/config";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routers";
import { createContext } from "./context";

createHTTPServer({
	router: appRouter,
	createContext,
}).listen(2022);
