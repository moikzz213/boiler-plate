<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Profile;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
       
        if ($postRequest->query && count($postRequest->query) > 0) {
          
            foreach ($postRequest->query as $k => $v) {
                $userQuery = Profile::where('username', $v->No)->first(); 
              
                $comp = null;
                if ($v->Company_Name) {
                    if(is_numeric($v->Company_Name)){
                        $comp = $v->Company_Name;
                      
                    }else{
                    $comp = Company::where('title', $v->Company_Name)->first();
                        if (!$comp) {
                            $comp = Company::create([
                                'title' => $v->Company_Name
                            ]);
                        }
                    }
                }
                if(@$v->fullname){
                    $fullname = $v->fullname;
                    $arrayName = explode(" ",$fullname);
                    $firstName = @$arrayName[0] ? $arrayName[0] : '';
                    $lastName =  @$arrayName[1] ? end($arrayName) : '';
                }else{
                    $fullname = $v->Last_Name
                        ? trim(strtolower($v->First_Name)) .
                            ' ' .
                            trim(strtolower($v->Last_Name))
                        : trim(strtolower($v->First_Name));
                    $firstName = $v->First_Name;
                    $lastName = $v->Last_Name;
                }
               
                $now = Carbon::now();
                $date = Carbon::parse($v->Employment_Date);
                $diff = $date->diffInDays($now);
                $profileData = [
                    'status' => @$v->Status ? $v->Status : 'Active',
                    'ecode' => $v->No,
                    'username' => $v->No,
                    'superior_ecode' => @$v->Superior_ID ? $v->Superior_ID : null,
                    'display_name' => ucwords($fullname),
                    'first_name' => trim(strtolower($firstName)),
                    'grade' => @$v->Equivalent_Grade_Code,
                    'grade_original' => @$v->Grade_Code,
                    'last_name' => trim(strtolower($lastName)),
                    'email' => @$v->E_Mail ? strtolower($v->E_Mail) : null,
                    'hrbp_email' => @$v->HRBP_E_Mail,
                    'department' => @$v->Pay_Department_Code ? $v->Pay_Department_Code : null,
                    'designation' => $v->PositionDescrition,
                    'dob' => $v->Birth_Date ? date('Y-m-d', strtotime($v->Birth_Date)) : null,
                    'doj' => @$v->Employment_Date ? date('Y-m-d', strtotime($v->Employment_Date)) : null, 
                    'nationality' => $v->Nationality,
                    'role'          => 'normal',
                    'is_regular'    => $diff < 200 ? 0 : 1,
                    'company_id' => $comp ? (is_numeric($comp) ? $comp : $comp->id ): 0
                ];
             
                if ($userQuery) {

                    $profileData = [
                        'status' => @$v->Status && in_array($v->Status, array('Active','active')) ? 'Active' : 'Inactive',
                        'superior_ecode' => @$v->Superior_ID ? $v->Superior_ID : null,
                        'display_name' => ucwords($fullname),
                        'first_name' => trim(strtolower($firstName)),
                        'grade' => @$v->Equivalent_Grade_Code,
                        'grade_original' => @$v->Grade_Code,
                        'last_name' => trim(strtolower($lastName)),
                        'email' => @$v->E_Mail ? strtolower($v->E_Mail) : null,
                        'hrbp_email' => $v->HRBP_E_Mail,
                        'department' => @$v->Pay_Department_Code ? $v->Pay_Department_Code : null,
                        'designation' => $v->PositionDescrition, 
                        'doj' => @$v->Employment_Date
                            ? date('Y-m-d', strtotime($v->Employment_Date))
                            : null,
                        'is_regular'    => $diff < 200 ? 0 : 1,
                        'company_id' => $comp ? (is_numeric($comp) ? $comp : $comp->id ): 0              
                    ]; 
                
                    $query = $userQuery->update($profileData);
                     
                } else { 
                    $query = Profile::create($profileData); 
                }
            }
        }
        return "Test";
       
    }
}
