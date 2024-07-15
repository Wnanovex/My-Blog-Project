<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::create($data);

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            ], 200);
    }

    public function login(Request $request){
        $data = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ]);

        $user = User::where('email', $data['email'])->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json(['message' => 'Provided email adderss or password is incorrect'], 422);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
             'user' => $user,
             'token' => $token,
             ], 200);

    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();

        return response()->json('', 200);

    }

    // public function test(){

    //     return response()->json(['message' => 'This is a test route'], 200);

    // }
}
