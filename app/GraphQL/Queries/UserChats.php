<?php

namespace App\GraphQL\Queries;

use Illuminate\Support\Facades\Auth;
use App\Models\UserInChat;

class UserChats
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $user = Auth::user();
        $userInChats = UserInChat::where('user_id', $user->id)->get();

        $userChats = array();
        foreach($userInChats as $userInChat){
            //Select sender
            $usersInChat = $userInChat->chat->usersInChat;
            $sender = null;
            foreach ($usersInChat as $_userInChat){
                if ($_userInChat->user_id != $user->id){
                    $sender = $_userInChat;
                }
            }

            $messagesInChat = $userInChat->chat->messages;
            $unseenMessagesCounter = 0;
            $lastMessage = null;
            foreach ($messagesInChat as $messageInChat) {
                if (!$messageInChat->seen && $messageInChat->receiver_id == $user->id){
                    $unseenMessagesCounter++;
                }
                $lastMessage = $messageInChat;
            }

            $userChats[] = [
                'userChat' => $userInChat,
                'sender' => $sender->user,
                'unseenMessagesCounter' => $unseenMessagesCounter,
                'lastMessageDate' =>  $lastMessage->created_at ?? null,
            ];
        }
        usort($userChats, function($a, $b) {
            return $a['lastMessageDate'] < $b['lastMessageDate'];
        });
        return $userChats;
    }
}
