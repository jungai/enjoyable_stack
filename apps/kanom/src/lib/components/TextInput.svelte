<script lang="ts">
	export let name: string;
	export let label: string | undefined = undefined;
	export let required: boolean = false;
	export let error: string | undefined = undefined;
	export let type: string = 'text';
	export let value: string | undefined = undefined;

	const onInput = (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		value = e.currentTarget.value;
	};
</script>

<div>
	{#if !!label}
		<label for={name} class="label">
			<span class="label-text">
				{label}
				{#if required}
					<span class="text-red-400 font-serif">*</span>
				{/if}
			</span>
		</label>
	{/if}
	<input {name} {type} {value} class="input input-bordered w-full" on:input={onInput} />
	{#if error}
		<span class="text-red-400 text-xs">{error}</span>
	{/if}
</div>
