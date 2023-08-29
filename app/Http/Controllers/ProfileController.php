<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class ProfileController extends Controller
{
    public function saveProfile(Request $request)
    {
        $profileArray = array(
            'full_name' => $request['full_name'],
            'dob' => $request['dob'],
            'nationality' => $request['nationality'],
        );
        $profile = Profile::updateOrCreate([
            'user_id' => $request['id'],

        ], $profileArray);
        return response()->json([
            'message' => 'Profile saved successfully',
            'profile' => $profile
        ], 200);
    }

    public function getProfileById($id)
    {
        $profile = Profile::where('user_id', $id)->first();
        return response()->json($profile, 200);
    }   

    public function fetchAuthProfile($ecode){
        $profile = Profile::where('ecode', $ecode) 
                ->with('company')->first(); 
        return response()->json([
            'result' => $profile
        ], 200);
    }

    

    public function getSingleUser($ecode)
    {
        $profile = Profile::where('ecode', $ecode)->with('company')->first();
        return response()->json($profile, 200);
    }

    public function getUsers()
    {
        $profiles = QueryBuilder::for(Profile::class)
        ->allowedFilters([
            AllowedFilter::callback('employee', function ($query, $value) {
                if($value !== null) {
                    $query->where('first_name', 'like', '%' . $value . '%') 
                    ->orWhere('last_name', 'like', '%' . $value . '%')
                    ->orWhere('display_name', 'like', '%' . $value . '%')
                    ->orWhere('email', 'like', '%' . $value . '%')
                    ->orWhere('role', 'like', '%' . $value . '%')
                    ->orWhere('status', 'like', '%' . $value . '%')
                    ->orWhere('ecode', 'like', '%' . $value . '%');
                }
            })->ignore('null')
        ])->orderBy('status','asc')->orderBy('role','asc')
        ->paginate(10)
        ->appends(request()->query());
        return response()->json($profiles, 200);
    }

    public function saveAccount(Request $request)
    { 
        $profile = Profile::where('ecode', $request['ecode'])->first();
        $msg  = 'Account saved successfully';
        if($request['enable']){
            
            if($request['enable'] == 'Active'){
                $msg = 'Account has been Enable';
                $updateData = array('status' => $request['enable'], 'sync' => 1);
            }else{
                $msg = 'Account has been Disabled';
                $updateData = array('status' => $request['enable'], 'sync' => 0);
            }

            $profile->update($updateData);

        }else{
            $profile->update([ 
                'role' => $request['role']
            ]);
        }

        $profile->logs()->create([
            'profile_id' => $request['author'],
            'details' => $profile,
            'log_type' => 'update'
        ]);

        return response()->json([
            'message' => $msg
        ], 200);
    }
}
