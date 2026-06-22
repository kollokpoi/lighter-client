import './style.css'
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVuePlugin from './plugins/primevue.js';

const app = createApp(App)
app.use(createPinia())
app.use(PrimeVuePlugin)

app.mount('#app')

