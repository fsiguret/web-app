import { defineStore } from 'pinia';
import { toRaw } from 'vue';

export const useTaskStore = defineStore('task', {
	state: () => ({
		tasksList: [],
		isConfirmRemoveTask: false,
		currentTask: {},
	}),
	actions: {
		async addTask(task) {
			this.tasksList.unshift(task);
		},
		removeTask(task) {
			this.tasksList.splice(this.tasksList.indexOf(task), 1);
		},
		editTask(task) {
			this.removeTask(task);
			this.addTask(task);
		},
		confirmRemoveTask() {
			this.isConfirmRemoveTask = !this.isConfirmRemoveTask;
		},
		setCurrentTask(task) {
			this.currentTask = task;
		},
		wantEditTask(task) {
			task === this.currentTask ? this.setCurrentTask({}) : this.setCurrentTask(toRaw(task));
		},
	},
});
