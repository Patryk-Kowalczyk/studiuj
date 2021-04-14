<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserSettingsController extends Controller
{
    public function edit(Request $request){
        $request->validate([
            'email' => 'required|unique:users|email',
            'name' => 'required|max:255',
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:512',
        ]);

        $user = Auth::user();
    }
}
