<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // register
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required',
            'email' => 'required|unique:users|max:190',
            'password' => 'required',
        ]);

        $validatedData['logined'] = 0;
        $validatedData['password'] = Hash::make($validatedData['password']);

        DB::table('users')->insert($validatedData);
        return "OK";
    }
}
