<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CompanyRequest;
use App\Http\Resources\TrainerResource;
use App\Models\User;
use App\Models\Pokemon;
use App\Http\Requests\UserRequest;

class UserController extends Controller
{
    public function index()
    {
        $users = User::select('id','name')->paginate(10);
        
        $users = $users->map(function($q){
            foreach($q->pokemons as $key => $pokemon){
                $q->{'pokemon' . ($key+1)} = $pokemon->name;
                if($key == 2)
                    break;
            }
            $q->unsetRelation('pokemons');
            return $q;
        });

        try{
            $data = TrainerResource::collection($users);

            $count = ceil(User::count()/10);

            return compact('data','count');
        }
        catch(\Exception $e){
            return response()->json([
                'message' => 'Something went wrong in UserController',
                'error' => $e->getMessage()
            ],500);
        }
        
    }

    public function store(UserRequest $request)
    {
        $newUser = new User();

        $newUser->name = $request->nickname;
        $newUser->save();

        foreach($request->pokemons as $pokemon){
            $newPokemon = new Pokemon;
            $newPokemon->name = $pokemon['name'];
            $newPokemon->number_pokedex = $pokemon['id'];
            $newPokemon->user_id = $newUser->id;
            $newPokemon->save();
        }

        return new TrainerResource($newUser);
    }

    public function show($id)
    {
        try{
            return new TrainerResource(User::findOrfail($id)->load('pokemons'));
        }
        catch(\Exception $e){
            return response()->json([
                'message' => 'Something went wrong in UserController',
                'error' => $e->getMessage()
            ],500);
        }
    }
}
