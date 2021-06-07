<?php


namespace App\GraphQL\Queries;


use App\Enums\PaymentStatuses;
use App\Models\Order;
use App\Models\Advertisement;
use App\Models\Payment;
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
        })->orWhere('user_id',$user)->get();
        foreach ($orders as $order) {
            $payments = Payment::where('order_id', $order->id)->get();


            $payment = null;
            foreach ($payments as $clientPayment) {
                if ($clientPayment->payment_status == PaymentStatuses::SUCCEEDED ||
                    $clientPayment->payment_status == PaymentStatuses::REFUNDED) {
                    $payment = $clientPayment;
                    break;
                } else {
                    $payment = $clientPayment;
                }
            }

            $order['status'] = $payment->payment_status ?? null;

        }
        return $orders;
    }
}
