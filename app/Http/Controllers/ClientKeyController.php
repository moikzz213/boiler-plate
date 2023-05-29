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
        ->with('teams.reviews.keyReview', 'reviews.keyReview')->with('reviews',function ($q) {
            $q->where('year', Carbon::now()->format('Y'));
        })->first();

        $globalKpiStatus = PerformanceSetting::where([
            'company_id' => $profile->company_id,
            'year'      => Carbon::now()->format('Y')
            ])->orderBy('year', 'desc')->limit(1)->first();
          
        return response()->json([
            "message" => 'Key saved successfully',
            "client" => $clientKey,
            'globalKeyStatus' => $globalKpiStatus,
            "profile" => $profile
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