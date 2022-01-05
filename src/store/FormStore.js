import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', {
	state: () => ({
		currentErrors: new Set(),
		errors: {
			name: 'Nom invalide',
			delay: 'Date invalide',
		},
	}),
	actions: {
		async addError(errorType) {
			await this.currentErrors.add(this.errors[`${errorType}`]);
		},
		removeError(errorType) {
			this.currentErrors.delete(this.errors[`${errorType}`]);
		},
		clearErrors() {
			this.currentErrors.clear();
		},
	},
});
