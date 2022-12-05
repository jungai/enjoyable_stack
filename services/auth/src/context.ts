import { inferAsyncReturnType } from "@trpc/server";
import trpcNext from "@trpc/server/adapters/next";
import { PrismaClient } from "@prisma/client";

export async function createContext(_?: trpcNext.CreateNextContextOptions) {
	const prisma = new PrismaClient();

	return {
		prisma,
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
