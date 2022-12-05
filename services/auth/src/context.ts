import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { PrismaClient } from "@prisma/client";

export async function createContext(_ctx: CreateFastifyContextOptions) {
	const prisma = new PrismaClient();

	return {
		prisma,
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
