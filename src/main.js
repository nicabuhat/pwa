import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './registerServiceWorker';
import './assets/style/tailwind.css';
import './assets/style/fontawesome.css';
import './assets/style/light.css';
import { createPPTXPlugin } from '@/plugins/pptxPlugin';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(createPPTXPlugin());
app.mount('#app');
