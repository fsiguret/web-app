<script setup>
	defineProps({
		id: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			default: 'text',
		},
		placeholder: {
			type: String,
		},
		label: {
			type: String,
		},
		modelValue: {
			type: String,
		},
	});
</script>
<template>
	<div>
		<label :for="id">{{ label }} <slot /></label>
		<input
			:id="id"
			:type="type"
			:placeholder="placeholder"
			v-model="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
	</div>
</template>

<style scoped lang="scss">
	div {
		label {
			width: 100%;
		}
		input {
			width: 100%;
			padding: 0.5em;
			color: var(--font-color);
			border: solid 2px #bfbfbf;
		}
	}
</style>
