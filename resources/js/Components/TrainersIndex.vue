<template>
   <div>
     <div id="my-modals"></div>
       <div>
            <div class="w-full min-h-screen h-48">
                <div class="h-1/5 bg-teal-700 text-white flex flex-col items-center justify-center">
                    <h1 class="text-5xl font-black mb-2">{{message}}</h1>
                </div>
                <div class="w-full h-4/5 overflow-y-auto bg-cyan-200 px-40 py-4">
                    <table class="min-w-full">
                        <thead class="bg-blue-200 border-b">
                            <tr>
                            <th scope="col" class="text-sm font-medium text-blue-900 px-6 py-4 text-left">
                                #
                            </th>
                            <th scope="col" class="text-sm font-medium text-blue-900 px-6 py-4 text-left">
                                Nickname
                            </th>
                            <th scope="col" class="text-sm font-medium text-blue-900 px-6 py-4 text-left">
                                Pokemon 1
                            </th>
                            <th scope="col" class="text-sm font-medium text-blue-900 px-6 py-4 text-left">
                                Pokemon 2
                            </th>
                            <th scope="col" class="text-sm font-medium text-blue-900 px-6 py-4 text-left">
                                Pokemon 3
                            </th>
                             <th scope="col" class="text-sm font-medium text-blue-900 px-6 py-4 text-left">
                                Detalles
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(trainer,k) in trainers" :key="k" class="bg-white border-b transition duration-300 ease-in-out hover:bg-blue-100">
                                <td class="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{trainer.id}}
                                </td>
                                <td class="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{trainer.name}}
                                </td>
                                <td class="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{trainer.pokemon1}}
                                </td>
                                <td class="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{trainer.pokemon2}}
                                </td>
                                <td class="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                                    {{trainer.pokemon3}}
                                </td>
                                 <td class="text-sm text-blue-900 font-light px-6 py-4 whitespace-nowrap">
                                    <button @click="showModal(trainer.id)" class="bg-blue-300 hover:bg-blue-400 text-blue-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                        <span>Ver</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                    <MyModal v-if="trainer" v-model="isShow" :close="closeModal">
                        <div class="modal">
                            <div class="flex flex-col w-full rounded-lg border border-gray-300 shadow-xl">
                            
                                <div class="flex flex-col px-6 py-5 bg-sky-800 text-white ">
                                <p class="mb-2 font-semibold">Entrenador: {{trainer.name}}</p>
                                <div class="flex items-center mt-5 mb-3 space-x-4">
                                    Team Pokémon
                                </div>
                                <div v-for="(pokemon,k) in pokemonsData" :key="k" class="flex flex-row items-center justify-between p-5 bg-white border border-sky-200 rounded shadow-sm">
                                    <div class="flex flex-row items-center">
                                    <img
                                        class="w-10 h-10 mr-3 rounded-full"
                                        :src="pokemon.image"
                                        alt=""/>
                                    <div class="flex flex-col">
                                        <p class="font-semibold text-gray-800">{{pokemon.name}}</p>
                                    </div>
                                    </div>
                                    <div >
                                        <h1 v-for="(type,k) in pokemon.type" :key="k" class="font-semibold text-green-400">{{type.type.name}}</h1>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </MyModal>
                    </div>
                    <div class="flex items-center justify-center">
                         <v-pagination
                            v-model="page"
                            :pages="pageCount"
                            :range-size="1"
                            active-color="#DCEDFF"
                            @update:modelValue="getTrainers"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import useTrainers from './../Services/pokemon'
import { onMounted } from 'vue';
import { ref } from 'vue';

const isShow = ref(false);

function showModal(id) {
    getTrainer(id);
    isShow.value = true;
}

function closeModal() {
    resetData();
    isShow.value = false;
}

let page = ref(1);

const {trainer,trainers,getTrainers,pageCount,getTrainer, pokemonsData, resetData} = useTrainers()

const message = "Trainners"

onMounted(() => getTrainers(page))

</script>
<style>
.p-datatable {
    position: inherit !important;
}
.modal {
  width: 50%;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  font-size: 20px;
  text-align: center;
}
</style>