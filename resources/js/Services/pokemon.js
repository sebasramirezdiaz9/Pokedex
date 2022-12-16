import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
export default function useTrainers() {
    const trainer = ref([])
    const trainers = ref([])
    const pokemons = ref([])
    const errors = ref('')
    const pokemonsData = ref([]);
    const pageCount = ref([]);
    const router = useRouter()

    const getTrainers = async (page) => {
        let response = await axios.get('/trainers?page='+ page)
        trainers.value = response.data.data
        pageCount.value = response.data.count
    }

    const getTrainer = async (id) => {
        let response = await axios.get('/trainers/'+id)
        trainer.value = response.data.data
        response.data.data.pokemons.forEach(element => {
            getPokemonsData(element.number_pokedex);
        });
    }

    const storeTrainer = async (data) => {
        errors.value = ''
        
        try {
            await axios.post('/trainers', data)
            swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Trainer has been registered',
                showConfirmButton: false,
                timer: 1500
              })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }

    }

    const getPokemonsData = async(id) =>{
        let response = await axios.get('https://pokeapi.co/api/v2/pokemon/'+id);

        const pokemon = {
            name: response.data.name,
            type: response.data.types,
            image: response.data.sprites.front_default
          };
          
        pokemonsData.value.push(pokemon);
    }

    const getPokemons = async() => {
        //This way was necessary because the general api does not provide images
        for (let index = 1; index < 151; index++) {
            let response = await axios.get('https://pokeapi.co/api/v2/pokemon/'+index);

            const pokemon = {
                id: response.data.id,
                name: response.data.name,
                image: response.data.sprites.front_default
            };
          
        pokemons.value.push(pokemon);
            
        }
        /*let response = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150')
        pokemons.value = response.data.results;*/
    }

    const resetData = async =>{
        pokemonsData.value = [];
    }

    return {
        resetData,
        pokemonsData,
        pageCount,
        pokemons,
        errors,
        trainers,
        trainer,
        getPokemons,
        getTrainer,
        getTrainers,
        storeTrainer,
    }
}