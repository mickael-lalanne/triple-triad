import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// AWS Amplify
import { Amplify, Auth } from 'aws-amplify';
import awsExports from './aws-exports';

// Vuetify
import vuetify from './plugins/vuetify';

Amplify.configure(awsExports);
Auth.configure(awsExports);

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount('#app');
