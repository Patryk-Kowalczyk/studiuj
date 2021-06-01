<?php

namespace App\GraphQL\Mutations;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class CreateOrder
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $user = Auth::user();

        if ($user->id === $args['user_id']){
            return ;
        }

        $newOrder = Order::create([
            'advertisement_id' => $args['advertisement_id'],
            'user_id' => $args['user_id'],
        ]);

        return $newOrder;
    }
}
