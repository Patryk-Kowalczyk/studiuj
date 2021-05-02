<?php

namespace App\GraphQL\Mutations;

use App\Models\UserUniversity;
use Illuminate\Support\Facades\Auth;

class AddUniversity
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $university = UserUniversity::create([
            'profile_id' => Auth::user()->profile->id,
            'major' => $args['major'],
            'finished' => $args['finished'],
        ]);

        if (isset($args['name'])){
            $university->name = $args['name'];
            $university->save();
        }
        if (isset($args['university_id'])){
            $university->university_id = $args['university_id'];
            $university->save();
        }
        return $university;
    }
}
