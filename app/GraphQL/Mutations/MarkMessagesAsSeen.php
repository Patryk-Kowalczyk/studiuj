<?php

namespace App\GraphQL\Mutations;

use App\Events\ChangeChatInfo;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class MarkMessagesAsSeen
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $user = Auth::user();
        $chatId = (int)$args['chat_id'];
        Message::where('receiver_id', $user->id)
            ->where('chat_id', $chatId)
            ->where('seen', false)
            ->update([
                'seen' => true
            ]);

        broadcast(new ChangeChatInfo($user->id))->toOthers();

        return true;
    }
}
