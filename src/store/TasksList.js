import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
	state: () => ({
		tasksList: new Set(),
	}),
	actions: {
		addTask(task) {
			this.tasksList.add(task);
		},
	},
});
