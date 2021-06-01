<?php

namespace App\GraphQL\Queries;

use App\Models\Message;
use App\Models\UserInChat;
use Illuminate\Support\Facades\Auth;

class LastUnseenMessages
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $user = Auth::user();
        $userInChats = UserInChat::where("user_id", $user->id)->get();
        $lastMessages = array();

        $unseenChatsCounter = 0;
        foreach ($userInChats as $userInChat)
        {
            $lastChatMessage = Message::where('chat_id', $userInChat->chat_id)
                ->where('seen', false)
                ->where('receiver_id', $user->id)
                ->orderBy('created_at', 'DESC')
                ->first();
            if ($lastChatMessage){
                $lastMessages[] = $lastChatMessage;
                $unseenChatsCounter++;
            }
        }
        usort($lastMessages, function($a, $b) {
            return $a->created_at < $b->created_at;
        });
        if (count($lastMessages) > 3){
            $lastMessages = array_slice($lastMessages,0, 3);
        }
        return [
            'messages' => $lastMessages,
            'unseenChatsCounter' => $unseenChatsCounter,
        ];
    }
}
