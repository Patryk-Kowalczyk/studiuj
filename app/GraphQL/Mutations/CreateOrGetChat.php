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
        $authUserInChats = UserInChat::where('user_id', $user->id)->get();
        $receiver = User::findOrFail($args['id']);
        //Search chat same for both users
        foreach ($authUserInChats as $authUserInChat){
            $chatUsers = $authUserInChat->chat->usersInChat;
            foreach ($chatUsers as $chatUser){
                if ($chatUser->id == $args['id']){
                    return $authUserInChat->chat;
                }
            }
        }


        $chat = Chat::create();
        $chat->usersInChat()->create([
            'user_id'=>$user->id,
        ]);
        $chat->usersInChat()->create([
            'user_id'=>$receiver->id,
        ]);
        return $chat;
    }
}
