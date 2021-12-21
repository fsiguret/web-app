<script setup>
	import { useAppStore } from '../store/AppStore';

	const firstName = 'Jhon';
	const lastName = 'Doe';
	const atName = '@Jhon_Doe';

	const store = useAppStore();

	function removeMenu() {
		store.switchMenu();
	}
</script>

<template>
	<header>
		<div class="presentation">
			<svg @click.prevent="removeMenu"><use href="/img/sprite.svg#x"></use></svg>
			<div>
				<img src="https://picsum.photos/100/100" alt="#" />
				<p>{{ firstName }} {{ lastName }}</p>
				<p>{{ atName }}</p>
			</div>
		</div>
		<div class="navigation">
			<nav class="navbar">
				<ul class="navbar__ul">
					<li>
						<router-link class="routerLink" to="/task">
							<span class="routerLink__span">
								<svg><use href="/img/sprite.svg#menu"></use></svg>
							</span>
							<span class="routerLink__span"> Ma Liste </span>
						</router-link>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<style scoped lang="scss">
	header {
		position: absolute;
		background: white;
		width: 25%;
		height: 100%;
		z-index: 10;
		box-shadow: 6px 0 14px 2px rgba(0, 0, 0, 0.21);
		.presentation {
			background-image: url('https://picsum.photos/500/500');
			svg {
				cursor: pointer;
				margin-left: auto;
				width: 24px;
				height: 24px;
			}
			div {
				padding: 2.1em 0 1.5em 1.5em;
				img {
					border-radius: 50%;
				}
			}
		}
		.navigation {
			.navbar {
				&__ul {
					padding: 0;
					li {
						list-style: none;
						.routerLink {
							display: flex;
							margin: 2em auto;
							width: fit-content;
							text-decoration: none;
							&:link {
								color: var(--font-color);
							}
							&:visited {
								color: var(--font-color);
							}
							&__span {
								&:nth-child(2) {
									margin-left: 1em;
								}
								svg {
									width: 24px;
									height: 24px;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
