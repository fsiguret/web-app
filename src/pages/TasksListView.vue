<script setup>
	import { useTaskStore } from '../store/TasksList';
	import { useAppStore } from '../store/AppStore';
	import { storeToRefs } from 'pinia';
	import BaseButton from '../components/BaseButton.vue';
	import Task from '../components/Task.vue';

	const store = useTaskStore();
	const { wantAddTask } = useAppStore();
	const { confirmRemoveTask, removeTask } = useTaskStore();
	const { tasksList, isConfirmRemoveTask, currentTask } = storeToRefs(store);

	function removeCurrentTask(task) {
		removeTask(task);
		confirmRemoveTask();
	}
</script>
<template>
	<section v-if="tasksList.length <= 0 || undefined" class="tasksDone flex">
		<svg class="tasksDone__svg"><use href="/img/sprite.svg#check"></use></svg>
		<h2 class="tasksDone__title"><span>Bravo, </span>vous n'avez plus de tâches !</h2>
		<base-button value="Ajouter une nouvelle tâche" @click.prevent="wantAddTask()" />
	</section>
	<task v-for="task in tasksList" :key="task" :task="task" />
	<section class="confirmRemove" v-if="isConfirmRemoveTask">
		<h2 class="confirmRemove__tittle">Voulez vous vraiment supprimer la tâche "{{ currentTask.name }}" ?</h2>
		<div class="confirmRemove__buttons flex">
			<base-button class="accept" value="Oui" @click.prevent="removeCurrentTask(currentTask)" />
			<base-button class="refuse" value="Non" @click.prevent="confirmRemoveTask" />
		</div>
	</section>
</template>

<style scoped lang="scss">
	.tasksDone {
		flex-direction: column;
		padding: 8em;
		color: var(--secondary-color);
		&__svg {
			width: 100px;
			height: 100px;
			margin-bottom: 2em;
		}
		&__title > span {
			text-align: center;
			display: block;
			width: 100%;
		}
		&__addTask {
			cursor: pointer;
			background: var(--validation-color);
			border: none;
			color: white;
			padding: 0.5em 1.7em;
			margin: 3em auto;
			transform: scale(1);
			transition: transform 0.2s linear;
			&:hover {
				transform: scale(1.1);
			}
		}
	}

	.confirmRemove {
		position: absolute;
		background: var(--secondary-background);
		z-index: 1;
		top: 25%;
		left: 0;
		right: 0;
		flex-direction: column;
		width: 35%;
		background: white;
		padding: 2em 1.5em 1em 1.5em;
		margin: 5em auto;
		box-shadow: 6px 0 14px 2px rgba(0, 0, 0, 0.21);
		&__tittle {
			font-size: 1.2em;
			text-align: center;
			margin-bottom: 1em;
		}
		&__buttons {
			flex-direction: column;
			justify-content: center;
			> .accept {
				background: var(--error-color);
				margin: 0.5em auto;
			}
			> .refuse {
				margin: 0.5em auto;
			}
		}
	}
</style>
