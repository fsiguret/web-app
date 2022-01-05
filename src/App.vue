<script setup>
	import Menu from './components/Menu.vue';
	import { useAppStore } from './store/AppStore';
	import Task from './components/Task.vue';
	import { ref } from 'vue';

	const currentDate = new Date(Date.now());
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	};

	const date = currentDate.toLocaleDateString('fr-FR', options);

	const storeApp = useAppStore();

	let nameTask = ref('');
</script>

<template>
	<transition name="slide">
		<Menu v-if="storeApp.menuIsActive" />
	</transition>
	<main>
		<header class="topMain">
			<div @click.prevent="storeApp.switchMenu()" class="hamburger">
				<svg><use href="/img/sprite.svg#menu"></use></svg>
			</div>
			<div class="titleBlock">
				<h1 class="titleBlock__title">Ma Liste</h1>
				<p class="titleBlock__date">{{ date }}</p>
			</div>
			<button class="addTask flex" @click.prevent="storeApp.wantAddTask()">
				Ajouter une nouvelle tâche <svg><use href="/img/sprite.svg#plus"></use></svg>
			</button>
		</header>
		<Task v-if="storeApp.addTaskIsActive" :nameTask="nameTask" />
		<router-view />
	</main>
</template>

<style scoped lang="scss">
	.slide-enter-active,
	.slide-leave-active {
		transition: transform 0.5s ease;
	}
	.slide-enter-from,
	.slide-leave-to {
		transform: translateX(-1000px);
	}
	.topMain {
		background: url('https://picsum.photos/1080/500');
		display: flex;
		flex-direction: column;
		padding-bottom: 1em;
		.hamburger {
			cursor: pointer;
			margin: 2em auto 2em 2em;

			svg {
				width: 24px;
				height: 24px;
			}
		}
		.titleBlock {
			margin: 0 auto 0.5em 2em;
			&__title {
				font-size: 2.5em;
				font-weight: bold;
				line-height: normal;
			}
			&__date {
				text-transform: capitalize;
				font-size: 0.9em;
			}
		}
		.addTask {
			justify-content: space-between;
			cursor: pointer;
			background: var(--validation-color);
			border: none;
			width: 60%;
			color: white;
			padding: 0.5em 1.7em;
			margin: 1em auto;
			transform: scale(1);
			transition: transform 0.2s linear;
			svg {
				width: 24px;
				height: 24px;
			}
			&:hover {
				transform: scale(1.1);
			}
		}
	}
</style>
