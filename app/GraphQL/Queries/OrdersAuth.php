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
        $orders = Order::whereHas('advertisement', function ($query) use ($user) {
            return $query->where('user_id', $user);
        })->orWhere('user_id',$user)->orderBy('created_at', 'DESC')->get();
        return $orders;
    }
}
