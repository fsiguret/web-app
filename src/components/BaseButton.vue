<script setup>
	defineProps({
		type: {
			type: String,
			default: 'button',
		},
		value: {
			type: String,
		},
	});
</script>
<template>
	<button class="button" :type="type">{{ value }} <slot /></button>
</template>
<style scoped lang="scss">
	.button {
		cursor: pointer;
		background: var(--validation-color);
		border: none;
		width: 60%;
		color: white;
		padding: 0.5em 1.7em;
		margin: 1em auto;
		transform: scale(1);
		transition: transform 0.2s linear;
		&:hover {
			transform: scale(1.1);
		}
	}
</style>
