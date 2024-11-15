import './assets/tailwind.scss'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import DialogService from 'primevue/dialogservice';

import App from './App.vue'

const app = createApp(App)

app.use(PrimeVue, { theme: 'none' });
app.use(DialogService);

app.mount('#app')
