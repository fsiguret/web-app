import { defineStore } from 'pinia';

export const useAppStore = defineStore('application', {
	state: () => ({
		menuIsActive: false,
	}),
	actions: {
		switchMenu() {
			this.menuIsActive = !this.menuIsActive;
		},
	},
});
