<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    public function __construct(Request $request)
    {
        $request->request->add([
            'client_id' => env('PASSPORT_CLIENT_ID'),
            'client_secret' => env('PASSPORT_CLIENT_SECRET'),
        ]);
    }

    public function socialLogin($social){
        if ($social == "facebook" || $social == "google" || $social == "linkedin" || $social == "graph") {

            $scopes = [];

            if ($social == "graph") {
                $scopes = ['User.Read.All', 'Calendars.Read', 'Mail.Read'];
            }

            return Socialite::with($social)
                ->scopes($scopes)
                ->stateless()
                ->redirect();
        } else {
            return Socialite::with($social)->redirect();
        }
    }
    public function handleProviderCallback()
    {
        $userSocial = Socialite::driver('google')->stateless()->user();
        $user = User::firstOrNew(['email' => $userSocial->getEmail()]);
        if (!$user->id) {
            $user->fill([
                "name" => $userSocial->getName(),
                "password" => bcrypt("dummyPassword")
            ]);

            // Save user social
            $user->save();
        }

        $tokenCreated = $user->createToken('');
        $token = $tokenCreated->token;
        $token->client_id = 2;
        $token->save();
        $access_token = $tokenCreated->accessToken;
        //dd($access_token);
        return redirect(\config('client-page.url').'/oauth/token?'.$access_token);
    }

}
