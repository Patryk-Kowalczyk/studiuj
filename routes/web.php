<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/redirect/{social}','App\Http\Controllers\Auth\LoginController@socialLogin')->where('social','google');
Route::get('/auth/{social}/callback','App\Http\Controllers\Auth\LoginController@handleProviderCallback')->where('social','google');

Route::get('/', function () {
    return view('welcome');
});
