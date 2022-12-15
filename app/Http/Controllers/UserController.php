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
        return TrainerResource::collection(User::all());
    }

    public function store(UserRequest $request)
    {
        $newUser = new User();

        $newUser->name = $request->nickname;
        $newUser->save();

        foreach($request->pokemons as $pokemon){
            $newPokemon = new Pokemon;
            $newPokemon->name = $pokemon;
            $newPokemon->user_id = $newUser->id;
            $newPokemon->save();
        }

        return new TrainerResource($newUser);
    }

    public function show(User $user)
    {
        return new TrainerResource($user);
    }
}
