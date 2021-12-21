import { createApp } from 'vue';
import Router from './router/router.js';
import App from './App.vue';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(Router);
app.use(createPinia());
app.mount('#app');
