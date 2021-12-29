import Main from '@/pages/Main.vue';
import PostsPage from '@/pages/PostsPage.vue';
import About from '@/pages/About.vue';
import PostOnePage from '@/pages/PostOnePage.vue';
import PostsPageWithStore from '@/pages/PostsPageWithStore.vue';
import PostsPageCompositionApi from '@/pages/PostsPageCompositionApi.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: Main,
    },
    {
        path: '/posts',
        component: PostsPage,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/posts/:id',
        component: PostOnePage,
    },
    {
        path: '/store',
        component: PostsPageWithStore,
    },
    {
        path: '/composition',
        component: PostsPageCompositionApi,
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
});

export default router;
