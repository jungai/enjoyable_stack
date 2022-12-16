<script lang="ts">
	export let label: string;
</script>

<div class="form-control w-full max-w-xs">
	<label class="label">
		<span class="label-text">{label}</span>
	</label>
	<input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
</div>
