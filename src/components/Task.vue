<script setup>
	import { defineProps, ref } from 'vue';
	import { useTaskStore } from '../store/TasksList';
	import { useAppStore } from '../store/AppStore';

	const { addTask } = useTaskStore();
	const { wantAddTask } = useAppStore();

	const props = defineProps({
		nameTask: {
			type: String,
			required: true,
		},
		delay: {
			type: Date,
		},
		status: {
			type: String,
			default: 'À faire',
		},
	});

	defineEmits(['update:nameTask']);

	function addNewTask() {
		addTask({
			name: props.nameTask,
			delay: props.delay,
			status: props.status,
		})
			.then(() => {
				wantAddTask();
			})
			.catch((error) => console.log(error));
	}
</script>
<template>
	<form @submit.prevent="addNewTask" class="flex">
		<div class="flex">
			<label for="name">Nom <span>*</span></label>
			<input
				id="name"
				placeholder="Acheter des bananes"
				@input="$emit('update:nameTask', $event.target.value)"
				:value="nameTask"
			/>
		</div>
		<div class="flex">
			<label for="delay">Délais</label>
			<input id="delay" type="date" v-model="delay" />
		</div>
		<input class="addTask" type="submit" value="Ajouter" />
	</form>
</template>

<style scoped lang="scss">
	form {
		flex-direction: column;
		width: 35%;
		background: white;
		padding-top: 3em;
		margin: 5em auto;
		box-shadow: 6px 0 14px 2px rgba(0, 0, 0, 0.21);
		div {
			flex-wrap: wrap;
			width: 100%;
			label {
				width: 100%;
				span {
					color: var(--error-color);
				}
			}
			input {
				width: 100%;
				padding: 0.5em;
				color: var(--font-color);
				border: solid 2px #bfbfbf;
			}
			padding: 1em;
		}
		.addTask {
			background: var(--validation-color);
			border: none;
			color: white;
			padding: 0.5em 1.7em;
			margin: 3em auto;
		}
	}
</style>
