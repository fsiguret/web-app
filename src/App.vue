<script setup>
	import Menu from './components/Menu.vue';
	import { useAppStore } from './store/AppStore';

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

	const store = useAppStore();

	function displayMenu() {
		store.switchMenu();
		console.log(store.menuIsActive);
	}

	function addTask() {
		console.log('lol');
	}
</script>

<template>
	<transition name="slide">
		<Menu v-if="store.menuIsActive" />
	</transition>
	<main>
		<header class="topMain">
			<div @click.prevent="displayMenu" class="hamburger">
				<svg><use href="/img/sprite.svg#menu"></use></svg>
			</div>
			<div class="titleBlock">
				<h1 class="titleBlock__title">Ma Liste</h1>
				<p class="titleBlock__date">{{ date }}</p>
			</div>
			<form class="form" @submit.prevent="addTask">
				<input class="form__input" type="text" placeholder="Ajouter une tâche" />
				<label class="form__label">
					<svg><use href="/img/sprite.svg#plus"></use></svg>
				</label>
			</form>
		</header>
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
		.form {
			margin: 0 1.5em 0 1.5em;
			position: relative;
			&__input {
				width: 100%;
				padding: 0.7em;
			}
			&__label {
				position: absolute;
				top: 25%;
				right: 1em;
				cursor: pointer;
				svg {
					width: 24px;
					height: 24px;
				}
			}
		}
	}
</style>
