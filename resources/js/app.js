require('./bootstrap');

import { createApp } from 'vue';

import IndexApp from  './Components/IndexApp'
import TrainersIndex from  './Components/TrainersIndex'
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import 'primevue/resources/themes/tailwind-light/theme.css';
import 'primevue/resources/themes/saga-blue/theme.css';       
import 'primevue/resources/primevue.min.css';                
import 'primeicons/primeicons.css';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import 'vue-universal-modal/dist/index.css';
import VueUniversalModal from 'vue-universal-modal';
const app = createApp(TrainersIndex);
app.use(VueUniversalModal, {
    teleportTarget: '#my-modals',
    modalComponent: 'MyModal',
  });
app.use(PrimeVue);
app.component('DataTable',DataTable);
app.component('Column',Column);
app.component('VPagination',VPagination);
app.mount('#app');