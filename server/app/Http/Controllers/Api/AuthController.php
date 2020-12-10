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

    public function login(Request $request)
    {
        if ($request->isMethod('get')) {
            $user = DB::table('users')->where('logined', 1)->first();
            return response(['user' => $user]);
        } else if ($request->isMethod('post')) {
            $validatedData = $request->validate([
                'email' => 'required',
                'password' => 'required'
            ]);
            // print_r($validatedData);

            $email = $validatedData['email'];
            // return response(['attempt' => Auth::attempt($validatedData), 'a' => 'a']);
            if (Auth::attempt($validatedData)) {
                $user = DB::table('users')->where('email', $email)->first();
                if ($user->logined == 0) {
                    $validatedData['logined'] = 1;
                    $validatedData['password'] = Hash::make($validatedData['password']);
                    DB::table('users')->where('email', $email)->update($validatedData);
                    return response(['user' => $user]);
                } else {
                    return response(['user' => $user]);
                }
            } else {
                return response(['user' => 'no exists']);
            }
        }
    }

    public function logout()
    {
        $validatedData['logined'] = 0;
        DB::table('users')->where('logined', 1)->update($validatedData);
        Auth::logout();
    }
}
