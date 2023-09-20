<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use Response;

    public function login(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validate->fails()) {
            return $this->res($validate->errors());
        }
        if (!Auth::attempt([
            "email" => $request->email,
            "password" => $request->password
        ])) {
            return $this->error('Credential not match', 404);
        }

        return $this->success([
            'user' => Auth::user(),
            'token' => Auth::user()->createToken('API Token')->plainTextToken
        ], 'berhasil login');
    }

    public function register(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validate->fails()) {
            return $this->res($validate->errors());
        }

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => bcrypt($request->password),
        ]);

        Auth::login($user);

        return $this->success([
            'user' => Auth::user(),
            'token' => Auth::user()->createToken('API Token')->plainTextToken
        ], 'berhasil Register');
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Tokens Revoked'
        ];
    }
}
