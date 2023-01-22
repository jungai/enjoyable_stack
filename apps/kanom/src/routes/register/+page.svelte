<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import TextInput from '$lib/components/TextInput.svelte';
	import CheckBox from '$lib/components/CheckBox.svelte';
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';

	// form action
	// -> https://github.com/sveltejs/kit/issues/6836
	export let form: Record<string, any>;
</script>

<div class="h-screen flex items-center justify-center">
	<div class="w-full max-w-[400px] space-y-4 border rounded-md p-4">
		<form
			method="POST"
			action="?/register"
			use:enhance={({ form }) => {
				return async ({ result }) => {
					if (result.type === 'success') {
						form.reset();
						// goto login
						goto('/login');
					}

					if (result.type === 'failure') {
						await applyAction(result);
					}
				};
			}}
		>
			<TextInput
				name="username"
				required
				label="username"
				value={form?.data?.username ?? ''}
				error={form?.errors?.username}
			/>
			<TextInput
				type="password"
				name="password"
				required
				label="password"
				value={form?.data?.password ?? ''}
				error={form?.errors?.password}
			/>
			<TextInput
				type="password"
				name="confirmPassword"
				required
				label="confirm password"
				value={form?.data?.confirmPassword ?? ''}
				error={form?.errors?.confirmPassword}
			/>
			<CheckBox
				name="accepted"
				checked={form?.data?.accepted ?? false}
				label="accept a condition"
				error={form?.errors?.accepted}
			/>
			<div class="text-center">
				<Button type="submit">register</Button>
			</div>
		</form>
	</div>
</div>
