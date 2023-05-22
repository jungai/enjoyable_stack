import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { PrismaClient } from "@prisma/client";

export async function createContext(
	_ctx: trpcExpress.CreateExpressContextOptions
) {
	const prisma = new PrismaClient();

	return {
		prisma,
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
