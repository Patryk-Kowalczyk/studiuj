<?php


namespace App\GraphQL\Queries;


use App\Models\Order;
use App\Models\Advertisement;
use Illuminate\Support\Facades\Auth;

class OrdersAuth
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        $user = Auth::id();

        $orders = Order::with(['Advertisement' => function ($query) use ($user) {
            $query->where('user_id', $user);
        }])->orWhere('user_id',$user)->get();

        return $orders;
    }
}
