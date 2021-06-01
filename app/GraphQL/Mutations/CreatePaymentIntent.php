<?php

namespace App\GraphQL\Mutations;

use App\Models\Order;
use App\Models\Payment;
use Stripe\PaymentIntent;
use Stripe\Stripe;

Stripe::setApiKey(config('stripe.secret_key'));

class CreatePaymentIntent
{
    /**
     * @param  null  $_
     * @param  array<string, mixed>  $args
     */
    public function __invoke($_, array $args)
    {
        $secret = config('stripe.secret_key');
        \Safe\error_log($secret);
        $advertisement = Order::findOrFail($args['order_id'])->advertisement;
        $intent = PaymentIntent::create([
            'amount' => $advertisement->price*100,
            'currency' => 'pln',
            'payment_method_types' => ['p24'],
        ]);
        $paymentData = [
            'order_id' => $args['order_id'],
            'payment_intent' => $intent['id'],
            'payment_intent_client_secret' => $intent['client_secret'],
        ];
        $payment = Payment::create($paymentData);
        return $payment->payment_intent_client_secret;
    }
}
