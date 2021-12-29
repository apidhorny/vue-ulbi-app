import { createApp } from 'vue';
import App from './App.vue';
// import store from './store'
import components from '@/components/UI';
import router from './router/router';
import directives from '@/directives';
import store from './store';

// createApp(App).mount('#app');

const app = createApp(App);

components.forEach((component) => {
    app.component(component.name, component);
});
directives.forEach((directive) => {
    app.directive(directive.name, directive);
});

// createApp(App).use(store).use(router).mount('#app')
app.use(router)
    .use(store)
    .mount('#app');
