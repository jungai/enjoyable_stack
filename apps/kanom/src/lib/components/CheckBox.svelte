<script lang="ts">
	export let checked: boolean = false;
	export let label: string | undefined = undefined;
	export let name: string;
	export let error: string | undefined = undefined;

	const onChange = (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		checked = e.currentTarget.checked;
	};
</script>

<div class="form-control w-full max-w-xs">
	{#if label}
		<label for={name} class="cursor-pointer label justify-start space-x-4">
			<input {name} type="checkbox" {checked} class="checkbox" on:change={onChange} />
			<span class="label-text">{label}</span>
		</label>
		{#if error}
			<span class="label-text text-red-400 text-xs">{error}</span>
		{/if}
	{/if}
</div>
