import type { Actions } from '@sveltejs/kit';
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

			if (result.success) {
				return {
					success: true
				};
			}

			const { fieldErrors: errors } = result.error.flatten();
			const { password, confirmPassword, ...rest } = rawData;

			return {
				data: rest,
				errors: errors
			};
		} catch (error) {
			console.log('error ->', error);

			// TODO: handle error in sveltekit
		}
	}
};
