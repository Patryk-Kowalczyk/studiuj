<?php

namespace App\GraphQL\Mutations;

use App\Models\UserSchool;
use Illuminate\Support\Facades\Auth;

class AddSchool
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $school = UserSchool::create([
            'profile_id' => Auth::user()->profile->id,
            'name' => $args['name'],
            'major' => $args['major'],
            'finished' => $args['finished'],
        ]);
        return $school;
    }
}
