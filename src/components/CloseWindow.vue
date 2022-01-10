<script setup>
	import { useAppStore } from '../store/AppStore';
	import { useFormStore } from '../store/FormStore';
	const { wantAddTask } = useAppStore();
	const { clearErrors } = useFormStore();

	/**
	 * Close the add task menu and clear errors
	 */
	function removeMenu() {
		wantAddTask();
		clearErrors();
	}
</script>
<template>
	<svg class="removeMenu" @click.prevent="removeMenu"><use href="/img/sprite.svg#x"></use></svg>
</template>

<style scoped lang="scss">
	.removeMenu {
		position: absolute;
		top: 0;
		right: 0;
		margin: 0.5em;
		width: 24px;
		height: 24px;
		cursor: pointer;
		transform: scale(1);
		transition: transform 0.1s linear;
		&:hover {
			transform: scale(1.1);
		}
	}
</style>
