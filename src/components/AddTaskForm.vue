<script setup>
	import { useTaskStore } from '../store/TasksList';
	import { useAppStore } from '../store/AppStore';
	import { useFormStore } from '../store/FormStore';
	import { storeToRefs } from 'pinia';
	import BaseButton from './BaseButton.vue';
	import BaseInput from './BaseInput.vue';
	import CloseWindow from './CloseWindow.vue';

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
	<section>
		<header>
			<close-window />
			<h2>Ajouter une nouvelle tâche !</h2>
		</header>
		<form @submit.prevent="addNewTask" class="flex">
			<base-input id="name" label="Nom" placeholder="Acheter des bananes" v-model="nameTask"><span>*</span></base-input>
			<base-input id="delay" label="Délais" type="date" v-model="delay" />
			<div v-if="currentErrors.size > 0" class="error">
				<p v-for="error in currentErrors" :key="error">{{ error }}</p>
			</div>
			<base-button type="submit" value="Ajouter" />
		</form>
	</section>
</template>

<style scoped lang="scss">
	section {
		z-index: 1;
		position: absolute;
		left: 0;
		right: 0;
		flex-direction: column;
		width: 35%;
		background: white;
		padding: 2em 1.5em 1em 1.5em;
		margin: 5em auto;
		box-shadow: 6px 0 14px 2px rgba(0, 0, 0, 0.21);

		header {
			text-align: center;
			color: var(--font-color);
			margin-bottom: 1em;
		}
		form {
			flex-direction: column;
			span {
				color: var(--error-color);
			}
			.error {
				width: fit-content;
				margin: auto;
			}
			div {
				flex-wrap: wrap;
				width: 100%;
				padding: 1em;
				p {
					color: var(--error-color);
				}
			}
		}
	}
</style>
