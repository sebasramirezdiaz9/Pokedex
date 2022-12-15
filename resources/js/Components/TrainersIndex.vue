<template>
   <div>
            <div class="w-full min-h-screen h-48">
                <div class="h-1/5 bg-teal-700 text-white flex flex-col items-center justify-center">
                    <h1 class="text-5xl font-black mb-2">{{message}}</h1>
                </div>
                <div class="w-full h-4/5 overflow-y-auto bg-cyan-200 px-40">
                    <div class="flex w-full m-5 pr-4">
                    <ul v-if="pokemons" class="w-full p-4 m-auto md:grid grid-cols-4 md:gap-4">
                        <li
                        class="w-full"
                        v-for="(pokemon, k) in pokemons"
                        :key="k"
                        >
                        <input type="checkbox" @click="tooglePokemon(pokemon.name)" :id="'myCheckbox' + k" />
                        <label class="label-pokemon" :for="'myCheckbox' + k"
                            >
                            <div class="text-center">
                            {{ pokemon.name }}
                            </div></label
                        >
                        </li>
                    </ul>
                    </div>
                </div>
        </div>
    </div>
</template>

<script setup>

import useTrainers from './../Services/pokemon'
import { onMounted } from 'vue';
import { reactive } from 'vue'


const { errors, trainer,trainers,pokemons ,getPokemons,storeTrainer,getTrainers } = useTrainers()

const message = "Trainners"
const form = reactive({
    nickname: '',
    pokemons: []
})

const tooglePokemon = async(pokemon) => {
    form.pokemons.push(pokemon);
}

onMounted(() => getPokemons())

const saveTeam = async () => {
    await storeTrainer({ ...form })
}
</script>
