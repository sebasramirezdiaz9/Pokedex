require('./bootstrap');

import { createApp } from 'vue';
import router from "./router/index";
import NavBar from  './Components/TrainersIndex'
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import 'vue-universal-modal/dist/index.css';
import VueUniversalModal from 'vue-universal-modal';
const app = createApp({});

app.component('NavBar',NavBar);
app.use(router);
app.use(VueUniversalModal, {
    teleportTarget: '#my-modals',
    modalComponent: 'MyModal',
  });
app.component('VPagination',VPagination);
app.mount('#app');