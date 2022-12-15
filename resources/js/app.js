require('./bootstrap');

import { createApp } from 'vue';

import IndexApp from  './Components/IndexApp'

createApp({
    components: {
        IndexApp
    }})
    .mount("#app")