import { defineStore } from 'pinia';

export const useAppStore = defineStore('application', {
	state: () => ({
		menuIsActive: false,
		addTaskIsActive: false,
	}),
	actions: {
		switchMenu() {
			this.menuIsActive = !this.menuIsActive;
		},
		wantAddTask() {
			this.addTaskIsActive = !this.addTaskIsActive;
		},
	},
});
