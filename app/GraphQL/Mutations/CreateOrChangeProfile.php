<?php

namespace App\GraphQL\Mutations;

use App\Models\Profile;
use Illuminate\Support\Facades\Auth;

class CreateOrChangeProfile
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $user = Auth::user();
        $profile = Profile::where('user_id', $user->id)->first();

        if (!$profile){
            $profile = Profile::create([
                'user_id' => $user->id,
                'type_of_education' => $args['type_of_education']
            ]);
        } else {
            // Change value only if is different
            if ($profile->type_of_education != $args['type_of_education']){
                $profile->type_of_education = $args['type_of_education'];
                $profile->save();
            }
        }
        return $profile;
    }
}
