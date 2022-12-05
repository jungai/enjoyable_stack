<script lang="ts">
	import { trpc } from '$lib/trpc';

	let username = '';
	let password = '';

	async function handleOnClick() {
		const data = await trpc().register.mutate({ username, password });
		console.log('data ->', data);
	}
</script>

<h1 class="text-red-400 text-xl underline font-semibold">Hello</h1>
<br />

{username}
<input bind:value={username} class="border border-gray-400" placeholder="enter your username" />
{password}
<br />
<input bind:value={password} class="border border-gray-400" placeholder="enter your password" />
<br />
<button class="border border-gray-200 rounded-lg" on:click={handleOnClick}>register </button>
