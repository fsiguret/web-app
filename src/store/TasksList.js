import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
	state: () => ({
		tasksList: new Set(),
	}),
	actions: {
		async addTask(task) {
			await this.tasksList.add(task);
		},
		removeTask(task) {
			this.tasksList.delete(task);
		},
	},
});
