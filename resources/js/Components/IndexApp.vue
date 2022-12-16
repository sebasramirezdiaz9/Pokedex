<template>
   <div>
        <div class="sticky top-0 " v-if="errors">
        <div v-for="(v, k) in errors" :key="k" class="bg-red-400 text-white font-bold shadow-lg py-2 px-4 pr-0">
            <p v-for="error in v" :key="error" class="text-sm">
                {{ error }}
            </p>
        </div>
    </div>
        <form class="space-y-6" @submit.prevent="saveTeam">
            <div class="w-full min-h-screen h-48">
                <div class="h-1/5 bg-teal-700 text-white flex flex-col items-center justify-center">
                    <h1 class="text-5xl font-black mb-2">{{message}}</h1>
                    <div>
                        Nickname <input v-model="form.nickname" class="input-nickname" type="text" name="nickname" id="">
                    </div>
                </div>
                <div class="w-full h-4/5 overflow-y-auto bg-cyan-200 px-40">
                    <div class="bg-cyan-200 text-center sticky top-18 w-full flex items-center justify-center z-10 h-20">
                        <button class="bg-transparent border border-gray-800 hover:border-white hover:bg-white hover:text-cyan-600 text-gray-800 font-bold py-2 px-4 rounded-full">
                            Registrar
                        </button>
                    </div>
                    <div class="flex w-full m-5 pr-4">
                    <ul v-if="pokemons" class="w-full p-4 m-auto md:grid grid-cols-4 md:gap-4">
                        <li
                        class="w-full"
                        v-for="(pokemon, k) in pokemons"
                        :key="k"
                        >
                        <input type="checkbox" @click="tooglePokemon(pokemon)" :id="'myCheckbox' + k" />
                        <label class="label-pokemon" :for="'myCheckbox' + k">
                            <img style="margin: auto; display: block" :src="pokemon.image"/>
                            <div class="text-center">
                            {{ pokemon.name }}
                            </div></label
                        >
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>

import useTrainers from './../Services/pokemon'
import { onMounted } from 'vue';
import { reactive } from 'vue'


const { errors, trainer,trainers,pokemons ,getPokemons,storeTrainer,getTrainers } = useTrainers()

const message = "Pokémon Checklist"
const form = reactive({
    nickname: '',
    pokemons: []
})

const tooglePokemon = async(pokemon) => {
    let index = form.pokemons.findIndex((e)=>e.name === pokemon.name);
    if(index === -1){
        form.pokemons.push(pokemon);
    }
    else
    {
        form.pokemons.splice(index,1);
    }
}

onMounted(() => getPokemons())

const saveTeam = async () => {
    await storeTrainer({ ...form })
}
</script>

<style scoped>
.input-nickname{
    background: #31ffeb00;
    border: 1px solid #a0a0a0;
    border-radius: 20px;
    text-align: center;
}
input::placeholder {
  color: #2c2c2ca6;
  font-size: 1em;
}

ul {
  list-style-type: none;
}

li {
  display: inline-block;
}

input[type="checkbox"][id^="myCheckbox"] {
  display: none;
}

label {
  border: 1px solid #fff;
  padding: 10px;
  display: block;
  position: relative;
  margin: 10px;
  cursor: pointer;
}


label:before {
  background-color: white;
  color: white;
  content: " ";
  display: block;
  border-radius: 50%;
  border: 1px solid rgb(0, 0, 0);
  position: absolute;
  top: -5px;
  left: -5px;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 28px;
  transition-duration: 0.4s;
  transform: scale(0);
}

label img {
  height: 50px;
  width: 50px;
  transition-duration: 0.2s;
  transform-origin: 50% 50%;
}

:checked + label {
  opacity: 1;
  border-radius: 20px;
  border-color: rgb(0, 0, 0);
  background: #fff;
  box-shadow: 8px 5px 24px -11px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 8px 5px 24px -11px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 8px 5px 24px -11px rgba(0, 0, 0, 0.75);
}


:checked + label img {
  transform: scale(0.9);
  /* box-shadow: 0 0 5px #333; */
  z-index: -1;
}

.bounce{
  
  outline: 0;
  border-color: red !important;
  animation-name: bounce;
  animation-duration: .5s;
  animation-delay: 0.8s;
}

.bounce::placeholder {
  color: red;
}

/* This approximates the ease-in-out-bounce animation from easings.net, which would require a plug-in to use*/
@keyframes bounce {
  0% {
    transform: translateX(0px);
    timing-function: ease-in;
  }
  37% {
    transform: translateX(5px);
    timing-function: ease-out;
  }
  55% {
    transform: translateX(-5px);
    timing-function: ease-in;
  }
  73% {
    transform: translateX(4px);
    timing-function: ease-out;
  }
  82% {
    transform: translateX(-4px);
    timing-function: ease-in;
  }
  91% {
    transform: translateX(2px);
    timing-function: ease-out;
  }
  96% {
    transform: translateX(-2px);
    timing-function: ease-in;
  }
  100% {
    transform: translateX(0px);
    timing-function: ease-in;
  }
}

input.input-check:disabled{
    background: #f8f8f8;
}

.label-pokemon{
    opacity: 0.5;
    border: 1px solid #8a8a8a;
    border-radius: 20px;
}
</style>