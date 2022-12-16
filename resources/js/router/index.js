import {createRouter, createWebHistory} from "vue-router";
import  IndexApp from "./../Components/IndexApp";
import  TrainersIndex from "./../Components/TrainersIndex";

const routes = [
    {
        path: '/',
        name: 'register',
        component: IndexApp
    },
    {
        path: '/index',
         name: 'index',
        component: TrainersIndex
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;