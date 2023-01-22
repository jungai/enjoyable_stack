import { trpc } from '$lib/trpc';
import { type Actions, fail, error } from '@sveltejs/kit';
import { z } from 'zod';

const registerSchema = z
	.object({
		username: z
			.string({ required_error: 'username is required' })
			.min(1, 'username is required')
			.max(36)
			.trim(),
		password: z.string({ required_error: 'password is required' }).min(6).max(18).trim(),
		confirmPassword: z
			.string({ required_error: 'confirmPassword is required' })
			.min(6)
			.max(18)
			.trim(),
		accepted: z.enum(['on'], { required_error: 'Must be accept' })
	})
	.strict()
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'password and confirmPassword must be match!',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'password and confirmPassword must be match!',
				path: ['confirmPassword']
			});
		}
	});

export const actions: Actions = {
	// use name action instead
	register: async ({ request }) => {
		try {
			const rawData = Object.fromEntries(await request.formData());
			const result = registerSchema.safeParse(rawData);

			if (!result.success) {
				const { fieldErrors: errors } = result.error.flatten();
				const { password, confirmPassword, ...rest } = rawData;

				return fail(400, {
					data: rest,
					errors: errors
				});
			}
			const {
				data: { username, password }
			} = result;

			const resp = await trpc().register.mutate({ username, password });

			if (resp.success) {
				return { success: true };
			}
		} catch (err) {
			throw error(500, { message: '${err}' });
		}
	}
};
