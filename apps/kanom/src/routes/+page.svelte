<script lang="ts">
	import { trpc } from '$lib/trpc';
	import TextInput from '$lib/components/TextInput.svelte';

	let username = '';
	let password = '';

	async function handleOnClick() {
		const data = await trpc().register.mutate({ username, password });
		console.log('data ->', data);
	}
</script>

<TextInput label={'username'} />
<TextInput label={'password'} />
<button class="btn" on:click={handleOnClick}>register</button>
