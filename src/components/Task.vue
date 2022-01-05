<script setup>
	import { useTaskStore } from '../store/TasksList';
	import { useAppStore } from '../store/AppStore';
	import { useFormStore } from '../store/FormStore';
	import { storeToRefs } from 'pinia';

	const { addTask } = useTaskStore();
	const { wantAddTask } = useAppStore();
	const { addError, removeError, clearErrors } = useFormStore();
	const storeForm = useFormStore();
	const { currentErrors } = storeToRefs(storeForm);

	const props = defineProps({
		nameTask: {
			type: String,
			required: true,
		},
		delay: {
			type: String,
		},
		status: {
			type: String,
			default: 'À faire',
		},
	});

	function throwError() {
		if (!props.nameTask) {
			addError('name');
		} else {
			removeError('name');
		}
	}

	function addNewTask() {
		if (!!props.nameTask) {
			addTask({
				name: props.nameTask,
				delay: props.delay,
				status: props.status,
			})
				.then(() => {
					wantAddTask();
					clearErrors();
				})
				.catch((error) => console.log(error));
		} else {
			throwError();
		}
	}
</script>
<template>
	<form @submit.prevent="addNewTask" class="flex">
		<div class="flex">
			<label for="name">Nom <span>*</span></label>
			<input id="name" placeholder="Acheter des bananes" v-model="nameTask" />
		</div>
		<div class="flex">
			<label for="delay">Délais</label>
			<input id="delay" type="date" v-model="delay" />
		</div>
		<div v-if="currentErrors.size > 0" class="error">
			<p v-for="error in currentErrors" :key="error">{{ error }}</p>
		</div>

		<input class="addTask" type="submit" value="Ajouter" />
	</form>
</template>

<style scoped lang="scss">
	form {
		z-index: 1;
		position: absolute;
		left: 0;
		right: 0;
		flex-direction: column;
		width: 35%;
		background: white;
		padding-top: 3em;
		margin: 5em auto;
		box-shadow: 6px 0 14px 2px rgba(0, 0, 0, 0.21);
		.error {
			width: fit-content;
			margin: auto;
		}
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
			p {
				color: var(--error-color);
			}
			padding: 1em;
		}
		.addTask {
			cursor: pointer;
			background: var(--validation-color);
			border: none;
			color: white;
			padding: 0.5em 1.7em;
			margin: 1em auto 3em auto;
			transform: scale(1);
			transition: transform 0.2s linear;
			&:hover {
				transform: scale(1.1);
			}
		}
	}
</style>
