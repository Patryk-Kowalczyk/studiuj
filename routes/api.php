<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\Payment\PaymentController;
use App\Http\Controllers\Zoom\MeetingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('password/reset', 'App\Http\Controllers\Auth\ForgotPasswordController@reset');

Route::post('/meetings', [MeetingController::class,'create']);

Route::get('payments/handle-payment-response', [PaymentController::class, 'handle']);
