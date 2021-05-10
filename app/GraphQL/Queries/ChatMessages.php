<?php

namespace App\GraphQL\Queries;

use Illuminate\Support\Facades\Auth;
use App\Models\UserInChat;
use App\Models\Chat;

class ChatMessages
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $user = Auth::user();
        $id = $args['id'];
        $users = UserInChat::where('chat_id', $id)->get();
        if ($users){
            $canView = false;
            foreach($users as $userInChat)
            {
               if ($userInChat->user_id == $user->id){
                   $canView = true;
               }
            }
            if ($canView){
                return Chat::where('id', $id)->first();
            }
        }
        return ;
    }
}
