<script setup>
	import { useTaskStore } from '../store/TasksList';
	import { storeToRefs } from 'pinia';

	const store = useTaskStore();
	const { tasksList } = storeToRefs(store);
	//aller chercher si il y a des tâches dans une base de données fictive (JSON)
	//afficher la liste des tâches si il y en a
	//sinon afficher qu'on a déjà fait toutes les tâches

	function changeStatus() {}
	function editTask() {}
	function removeTask() {}
</script>
<template>
	<section v-if="tasksList.size <= 0 || undefined" class="tasksDone flex">
		<svg><use href="/img/sprite.svg#check"></use></svg>
		<h2 class="tasksDone__title"><span>Bravo, </span>vous n'avez plus de tâches !</h2>
	</section>
	<article class="task flex" v-else v-for="task in tasksList" :key="task">
		<div class="flex">
			<input class="task__input" type="checkbox" />
			<h3 class="task__name">{{ task.name }}</h3>
		</div>
		<p class="task__date">{{ task.delay }}</p>
		<p class="task__status" @click.prevent="changeStatus">{{ task.status }}</p>
		<div class="task__svg flex">
			<svg @click.prevent="editTask"><use href="/img/sprite.svg#edit"></use></svg>
			<svg @click.prevent="removeTask"><use href="/img/sprite.svg#trashcan"></use></svg>
		</div>
	</article>
</template>

<style scoped lang="scss">
	.tasksDone {
		flex-direction: column;
		padding: 8em;
		color: var(--secondary-color);
		svg {
			width: 100px;
			height: 100px;
			margin-bottom: 2em;
		}
		&__title > span {
			text-align: center;
			display: block;
			width: 100%;
		}
	}
	.task {
		margin: 1em;
		padding: 1em;
		background: var(--secondary-background);
		& > * {
			width: 25%;
		}
		& :not(:first-child) {
			justify-content: end;
		}

		svg {
			width: 24px;
			height: 24px;
			cursor: pointer;
			transition: transform 0.1s linear;
			&:first-child {
				color: var(--secondary-color);
				margin-right: 1em;
			}
			&:last-child {
				color: var(--error-color);
			}
			&:hover {
				transform: scale(1.1);
			}
		}
		&__name {
			padding: 1em;
			font-size: 1em;
			font-weight: normal;
			max-width: 100%;
		}

		&__date,
		&__status {
			text-align: end;
		}

		&__status {
			cursor: pointer;
			transition: transform 0.1s linear;
			&:hover {
				transform: scale(1.01);
			}
		}
	}
</style>
