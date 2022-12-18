<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	import CheckBox from '$lib/components/CheckBox.svelte';
	import Button from '$lib/components/Button.svelte';

	// form action
	// -> https://github.com/sveltejs/kit/issues/6836
	export let form: Record<string, any>;

	let username = form?.data?.username ?? '';
	let password = '';
	let confirmPassword = '';
	let accepted = form?.data?.accepted ?? false;
</script>

<div class="h-screen flex items-center justify-center">
	<div class="w-full max-w-[400px] space-y-4 border rounded-md p-4">
		<form method="POST" action="?/register">
			<TextInput
				name="username"
				required
				label="username"
				bind:value={username}
				error={form?.errors?.username}
			/>
			<TextInput
				type="password"
				name="password"
				required
				label="password"
				bind:value={password}
				error={form?.errors?.password}
			/>
			<TextInput
				type="password"
				name="confirmPassword"
				required
				label="confirm password"
				bind:value={confirmPassword}
				error={form?.errors?.confirmPassword}
			/>
			<CheckBox
				name="accepted"
				bind:checked={accepted}
				label="accept a condition"
				error={form?.errors?.accepted}
			/>
			<div class="text-center">
				<Button
					type="submit"
					on:click={() => {
						// alert('completed');
					}}
				>
					register
				</Button>
			</div>
		</form>
	</div>
</div>
