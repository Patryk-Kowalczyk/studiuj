<?php

namespace App\Http\Controllers\Payment;

use App\Enums\PaymentStatuses;
use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function handle(Request $request)
    {
        $payment_intent = $request->query('payment_intent');
        $payment_intent_client_secret = $request->query('payment_intent_client_secret');
        $payment = Payment::where('payment_intent' , $payment_intent)
            ->where('payment_intent_client_secret', $payment_intent_client_secret)
            ->first();
        if ($request->query('redirect_status') === "succeeded")
        {
            $payment->payment_status = PaymentStatuses::SUCCEEDED;
            $payment->save();
            return redirect(\config('client-page.url').'/user/payment/success');
        } else {
            return redirect(\config('client-page.url').'/user/payment/failed');
        }
    }
}
