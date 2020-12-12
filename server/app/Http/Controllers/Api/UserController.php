<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\User;

class UserController extends Controller
{
    public function usergetdata()
    {
        $result = User::all();
        return response()->json(array('admindatas' => $result, 'anth_check' => Auth::guard('web')));
    }

    public function usercreateorupgrade(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        $email = $validatedData['email'];
        $validatedData['logined'] = 0;
        $validatedData['role'] = 0;
        $validatedData['password'] = Hash::make($validatedData['password']);
        // print_r($validatedData);
        DB::table('users')->updateOrInsert(['email' => $email, 'logined' => 0], $validatedData);
        return "NEWUSERUPDATE";
    }
}
