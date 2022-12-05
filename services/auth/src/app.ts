import "dotenv/config";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { createContext } from "./context";
import { appRouter } from "./router";
import cors from "@fastify/cors";

const server = fastify({
	maxParamLength: 5000,
});

// plugins
server.register(cors);

server.register(fastifyTRPCPlugin, {
	prefix: "/trpc",
	trpcOptions: { router: appRouter, createContext },
});

(async () => {
	try {
		await server.listen({ port: 3000 });
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
})();
