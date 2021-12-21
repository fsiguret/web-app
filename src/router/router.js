import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
	routes: [
		{
			path: '/',
			component: () => import('../pages/TasksListView.vue'),
		},
	],
	history: createWebHistory(import.meta.env.BASE_URL),
});
