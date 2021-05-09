<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Chat;
use App\Models\UserInChat;

class CreateOrGetChat
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $user = Auth::user();
        $receiver = User::findOrFail($args['id']);
        $chat = Chat::create();
        $chat->usersInChat()->create([
            'user_id'=>$user->id,
        ]);
        $chat->usersInChat()->create([
            'user_id'=>$receiver->id,
        ]);
        return true;
    }
}
