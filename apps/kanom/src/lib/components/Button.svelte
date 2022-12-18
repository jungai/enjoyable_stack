<script lang="ts">
	import cls from 'classnames';
	export let type: string | undefined = undefined;
	export let disabled: boolean = false;

	$: className = cls({ btn: true }, { 'btn-disabled': disabled });
</script>

<button class={className} {type} {disabled} on:click><slot /></button>
