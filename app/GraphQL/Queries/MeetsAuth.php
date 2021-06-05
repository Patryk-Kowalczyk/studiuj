<?php

namespace App\GraphQL\Queries;

use App\Models\Meet;
use App\Models\Order;
use App\Models\Advertisement;
use Illuminate\Support\Facades\Auth;

class MeetsAuth
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args)
    {
        $orders = new OrdersAuth();
        $result=[];
        foreach($orders->__invoke([],[]) as $order){
            $result = $order->meets()->get();
        }
        return $result;
    }
}
