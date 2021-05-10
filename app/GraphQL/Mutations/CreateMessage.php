<?php

namespace App\GraphQL\Mutations;
namespace App\Models\Message;

class CreateMessage
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        \Safe\error_log("xD");
        $sender_id = $args['sender_id'];
        $receiver_id = $args['receiver_id'];
        $chat_id = $args['chat_id'];
        $text = $args['text'];

        $message = Message::create([
            'text' => $text,
            'sender_id ' => $sender_id,
            'receiver_id' => $receiver_id,
            'chat_id' => $chat_id,
        ]);
        return $message;
    }
}
