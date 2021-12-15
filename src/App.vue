<script setup>
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

	function displayMenu(event) {}
	function addTask() {
		console.log('lol');
	}
</script>

<template>
	<header>
		<div @click="displayMenu" class="hamburger">
			<div class="hamburger__line"></div>
			<div class="hamburger__line"></div>
			<div class="hamburger__line"></div>
		</div>
		<div class="titleBlock">
			<h1 class="titleBlock__title">Ma Liste</h1>
			<p class="titleBlock__date">{{ date }}</p>
		</div>
		<form class="form" @submit.prevent="addTask">
			<input class="form__input" type="text" placeholder="Ajouter une tâche" />
			<span></span>
		</form>
	</header>
	<main>
		<router-view />
	</main>
</template>

<style scoped lang="scss">
	header {
		display: flex;
		flex-direction: column;
		.hamburger {
			cursor: pointer;
			margin: 2em auto 2em 2em;
			&__line {
				width: 1.5rem;
				height: 4px;
				background-color: black;
				&:not(:last-child) {
					margin-bottom: 3px;
				}
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
		}
	}
</style>
