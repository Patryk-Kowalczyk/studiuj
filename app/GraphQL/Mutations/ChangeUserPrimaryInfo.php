<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ChangeUserPrimaryInfo
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $user = Auth::user();
        if ($user->name != $args['name']){
            $user->name = $args['name'];
        }

        $avatar = $args['avatar'];
        if (isset($avatar)){
            if ($user->avatar){
                unlink(public_path().'/'.$user->avatar);
            }
            $time = time();
            $avatar_extension = $avatar->extension();
            $avatar_path = "images/{$user->id}/avatar";
            $avatar_name = "{$time}.{$avatar_extension}";
            $avatar->move(public_path($avatar_path), $avatar_name);
            $user->avatar = "{$avatar_path}/{$avatar_name}";
        }

        $user->save();
        return $user;
    }
}
