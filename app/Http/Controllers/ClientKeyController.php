<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\ClientKey;
use App\Models\PerformanceSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon; 

class ClientKeyController extends Controller
{
    public function saveKey(Request $request)
    {
        // client key
        $clientKey = ClientKey::firstOrCreate([
            'key' => $request['key'],
            'ecode' => $request['user_ecode'] ? $request['user_ecode'] : null,
        ]); 

        // save employee profile
        // return profile with role for hrbp hr_admin
        $profile = Profile::where('ecode', $request['user_ecode'])
        ->with('teams.reviews.keyReview','teams.company', 'reviews.keyReview','company')->with('reviews',function ($q) {
            $q->where('year', Carbon::now()->format('Y'));
        })->first(); 
        
        $currentPmsSettings = PerformanceSetting::where([
            'company_id' => $profile->company_id,
            'year'      => Carbon::now()->format('Y')
        ])->first();

        return response()->json([
            "message" => 'Key saved successfully',
            "client" => $clientKey,
            "profile" => $profile,
            "pms_settings" => $currentPmsSettings
        ], 200);
    }

    public function removeKey(Request $request)
    {
        $clientKey = ClientKey::where([
            'key' => $request['key'],
        ])->delete();

        return response()->json([
            "message" => 'Key removed successfully',
            "client" => $clientKey
        ], 200);
    }
}