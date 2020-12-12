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

    public function createuser(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required',
            'email' => 'required|unique:users|max:190',
            'password' => 'required',
        ]);

        $validatedData['logined'] = 0;
        $validatedData['role'] = 0;
        $validatedData['password'] = Hash::make($validatedData['password']);

        DB::table('users')->insert($validatedData);
        return "CREATEUSER";
    }

    public function usercreateorupgrade(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required',
            'username' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        $id = $validatedData['id'];
        $validatedData['logined'] = 0;
        $validatedData['role'] = 0;
        $validatedData['password'] = Hash::make($validatedData['password']);
        // print_r($validatedData);
        DB::table('users')->where('id', $id)->update($validatedData);
        return "NEWUSERUPDATE";
    }

    public function userdelete(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required',
        ]);

        $id = $validatedData['id'];
        DB::table('users')->where('id', $id)->delete();
        return "U_DEL";
    }

    public function rolemanage(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required',
        ]);

        $id = $validatedData['id'];

        if (DB::table('users')->where('id', $id)->where('role', 0)->first()) {
            $validatedData['role'] = 1;
            DB::table('users')->where('id', $id)->where('role', 0)->update($validatedData);
        } else if (DB::table('users')->where('id', $id)->where('role', 1)->first()) {
            $validatedData['role'] = 0;
            DB::table('users')->where('id', $id)->where('role', 1)->update($validatedData);
        }
    }
}
