<script setup>
	import { useTaskStore } from '../store/TasksList';
	import { storeToRefs } from 'pinia';
	import BaseButton from '../components/BaseButton.vue';
	import BaseInput from '../components/BaseInput.vue';

	const store = useTaskStore();
	const { confirmRemoveTask, setCurrentTask, editTask, wantEditTask } = useTaskStore();
	const { currentTask } = storeToRefs(store);

	const props = defineProps({
		task: Object,
	});

	function changeStatus(task, newStatus) {
		task.status = newStatus;
		editTask(task);
	}
	function confirmRemove(task) {
		confirmRemoveTask();
		setCurrentTask(task);
	}
	function editCurrentTask() {
		editTask(props.task);
		wantEditTask(props.task);
	}
</script>
<template>
	<article class="flex task">
		<form class="flex task__form" @submit.prevent="editCurrentTask()" v-if="task === currentTask">
			<base-input class="task__form-input" id="name" v-model="task.name" />
			<base-input class="task__form-input" id="delay" type="date" v-model="task.delay" />
			<button class="task__form-submit" type="submit">
				<svg><use href="/img/sprite.svg#check"></use></svg>
			</button>
		</form>
		<div class="flex" v-else>
			<h3 class="name">{{ task.name }}</h3>
			<p class="date">{{ task.delay }}</p>
		</div>

		<div class="flex dropdown">
			<base-button class="dropdown__btn">{{ task.status }}</base-button>
			<div class="flex dropdown__content">
				<base-button class="dropdown__content-status" @click.prevent="changeStatus(task, 'À faire')"
					>À faire</base-button
				>
				<base-button class="dropdown__content-status" @click.prevent="changeStatus(task, 'En cours')"
					>En cours</base-button
				>
				<base-button class="dropdown__content-status" @click.prevent="changeStatus(task, 'Finis')">Finis</base-button>
			</div>
		</div>

		<div class="flex task__svg">
			<svg @click.prevent="wantEditTask(task)"><use href="/img/sprite.svg#edit"></use></svg>
			<svg @click.prevent="confirmRemove(task)"><use href="/img/sprite.svg#trashcan"></use></svg>
		</div>
	</article>
</template>
<style scoped lang="scss">
	.task {
		margin: 1em;
		padding: 1em;
		background: var(--secondary-background);
		justify-content: space-between;

		&__form {
			width: 50%;
			&-input {
				padding: 0.4em;
			}
			&-submit {
				width: 10%;
				background-color: transparent;
				border: none;
				cursor: pointer;
				transition: transform 0.1s linear;
				&:hover {
					transform: scale(1.1);
				}
				svg {
					width: 24px;
					height: 24px;
					color: var(--validation-color);
				}
			}
		}

		&__svg {
			& svg {
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
		}
		.dropdown {
			width: 15%;
			position: relative;
			&__btn {
				padding: 0.5em 0;
				width: 100%;
				margin: 0;
				text-align: center;
				transition: none;
				transform: none;
			}
			&:hover .dropdown__content {
				display: block;
			}

			&__content {
				display: none;
				flex-direction: column;
				text-align: center;
				position: absolute;
				top: 100%;
				left: 0;
				width: 100%;
				background: var(--secondary-background);
				box-shadow: 6px 0 14px 2px rgba(0, 0, 0, 0.21);
				z-index: 2;

				&-status {
					background: transparent;
					color: var(--font-color);
					padding: 0;
					width: 90%;
				}
			}
		}
		div {
			width: 60%;
			.name {
				padding: 1em;
				font-size: 1em;
				font-weight: normal;
				width: 50%;
			}
			.date {
				width: 50%;
			}
		}
		.task__svg {
			width: 25%;
			justify-content: flex-end;
		}
	}
</style>
