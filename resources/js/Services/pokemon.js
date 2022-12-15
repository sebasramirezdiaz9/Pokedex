import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useTrainers() {
    const trainer = ref([])
    const trainers = ref([])
    const pokemons = ref([])
    const errors = ref('')
    const router = useRouter()

    const getTrainers = async () => {
        let response = await axios.get('/trainers')
        trainers.value = response.data.data
        console.log(trainers);
    }

    const getTrainer = async (id) => {
        //let response = await axios.get('/api/trainer/'+id)
        //trainer.value = response.data.data
        console.log(123);
    }

    const storeTrainer = async (data) => {
        errors.value = ''
        try {
            await axios.post('/trainers', data)
            //await router.push({ name: 'trainers.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }

    }

    const getPokemons = async() => {
        let response = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150')
        pokemons.value = response.data.results;
    }

    return {
        pokemons,
        errors,
        trainers,
        getPokemons,
        getTrainer,
        getTrainers,
        storeTrainer,
    }
}