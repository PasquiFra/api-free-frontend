import { createRouter, createWebHistory } from "vue-router";

//importo le pagine
import HomePage from "../routes/HomePage.vue";
import CreatePostsPage from "../routes/CreatePostPage.vue";

const router = createRouter({
    history: createWebHistory(),

    linkActiveClass: 'partial-active',
    linkExactActiveClass: 'active',
    routes: [
        //rotta HomePage
        { path: '/', name: 'home', component: HomePage },
        //rotta ShowPost
        { path: '/posts/create', name: 'create', component: CreatePostsPage }
    ]
});

export { router }