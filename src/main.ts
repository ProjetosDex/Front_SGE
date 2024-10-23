import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/router';
import App from './App.vue';

// Vuetify
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

const pinia = createPinia();
app.use(vuetify);
app.use(router);
app.use(pinia);

app.mount('#app');
