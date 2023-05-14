import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);
Auth.configure(awsExports);

const app = createApp(App);

app.use(router);

app.mount('#app');
