<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserApiController extends Controller
{
    public function login(Request $request)
    {
        // Validate login
        $fields = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Check email
        $user = User::where([
            'username' => $fields['username'],
            'status' => 'active'
        ])->first();

        // Check password
        if(!$user || !Hash::check($fields['password'], $user->password)){
            return response([
                'message' => 'Incorrect login credentials'
            ], 401);
        }

        // Generate Token
        $token = $user->createToken('gaguserstoken')->plainTextToken;

        // Response
        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function checkSanctumUser(Request $request)
    {
        $hasToken = auth('sanctum')->check();
        return response()->json([
            "user" => auth('sanctum')->user(),
            "hasToken" => $hasToken
        ], 200);
    }


    /**
     * Below are unsued
     */
    public function logout(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required|string'
        ]);
        $user = User::where([
            'username' => $fields['username'],
            'status' => 'active'
        ])->first();
        $token = $user->tokens()->delete();
        return response()->json([
            "user" => $user,
              // "token" => auth()->user()->tokens()
        ], 200);
    }

    public function getUser(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required|string'
        ]);
        $user = User::where([
            'username' => $fields['username'],
            'status' => 'active'
        ])->firstOrFail();

        // $hasToken = auth('sanctum')->check();

        if($user->tokens() != ""){
            $hasToken = true;
        }

        return response()->json([
            "user" => $user,
            "token" => $hasToken
        ], 200);
    }

        /**
     * Post API from UMS
     */
    public function addUpdateFromUMS(Request $request)
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
        header(
            'Access-Control-Allow-Headers: Content-Type, Accept, Authorization, X-Requested-With, Application'
        );
     
        $body = $request->getContent();
        $postRequest = json_decode($body);
        $query = null;

        $q = Profile::where('ecode',100194)->first();
        $q->update(['department' => 'IT']); 
        
        echo json_encode($q);
       return;
    }
}
