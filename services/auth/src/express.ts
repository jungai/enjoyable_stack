import express, { type Express } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { Logger } from "tslog";
import { appRouter } from "./routers";
import { createContext } from "./context";

function setupCors(e: Express): Express {
	return e.use(cors());
}

// TODO: move to utils or use winston instead
function setupLogger(e: Express): Express {
	const log = new Logger();

	e.use((req, res, next) => {
		log.debug(`hello`);
		next();
	});

	return e;
}

function setupTrpc(e: Express): Express {
	return e.use(
		"/trpc",
		trpcExpress.createExpressMiddleware({
			router: appRouter,
			createContext,
		})
	);
}

export const app: Express = [setupCors, setupLogger, setupTrpc].reduce(
	(e, middleware) => middleware(e),
	express()
);
