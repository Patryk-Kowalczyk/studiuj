<?php

namespace App\GraphQL\Mutations;

use App\Events\NewChatMessage;
use App\Models\Message;

class CreateMessage
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $sender_id = (int)$args['sender_id'];
        $receiver_id = (int)$args['receiver_id'];
        $chat_id = (int)$args['chat_id'];
        $text = $args['text'];

        $message = Message::create([
            'text' => $text,
            'sender_id' => $sender_id,
            'receiver_id' => $receiver_id,
            'chat_id' => $chat_id,
        ]);

        $messageResponse = [
            'id' => (string) $message->id,
            'sender' => ['id' => (string) $message->sender->id],
            'text' => $message->text,
            'chat_id' => $message->chat_id
        ];

        broadcast(new NewChatMessage($messageResponse))->toOthers();

        return $message;
    }
}
