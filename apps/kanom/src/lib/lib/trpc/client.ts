import type { AuthRouter } from '@aa/auth';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

export function trpc() {
	return createTRPCProxyClient<AuthRouter>({
		links: [
			httpBatchLink({
				url: 'http://localhost:3000/trpc'
			})
		]
	});
}
