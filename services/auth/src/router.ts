import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import { Context } from "./context";
import bcrypt from "bcrypt";

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
	register: t.procedure
		.input(
			z.object({
				username: z.string(),
				password: z.string().trim(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			try {
				const found = await ctx.prisma.user.findUnique({
					where: { username: input.username },
				});

				if (found) {
					// TODO: move to libs
					throw new TRPCError({
						code: "INTERNAL_SERVER_ERROR",
						message: "USER IS EXIST",
					});
				}
				const round = 10;
				const password = await bcrypt.hash(input.password, round);

				const user = await ctx.prisma.user.create({
					data: {
						username: input.username,
						password: password,
						createdAt: Date.now(),
						updatedAt: Date.now(),
					},
				});

				if (!user) {
					throw new TRPCError({
						code: "INTERNAL_SERVER_ERROR",
						message: "CAN'T CREATE USER",
					});
				}

				return {
					success: true,
				};
			} catch (error) {
				// TODO: global error
				console.log("error ->", error);
			}
		}),
});

export type appRouter = typeof appRouter;
