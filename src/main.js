import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Menubar from 'primevue/menubar';
import Textarea from 'primevue/textarea';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'primeicons/primeicons.css';
import './assets/main.css';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '[data-theme="dark"]',
      cssLayer: false,
    },
  },
});

app.component('Button', Button);
app.component('InputText', InputText);
app.component('Menubar', Menubar);
app.component('Textarea', Textarea);

app.mount('#app');
