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
        ->where('status', 'Active')
        ->with(  
            'company','managed_by')
        ->with('reviews', function($q) {
            $q->where('year', Carbon::now()->format('Y'))->with('keyReview');
        }) // First Level
        ->with('teams')->first();

        $currentPmsSettings = PerformanceSetting::where([ 
            'year'      => Carbon::now()->format('Y')
        ])->get();

        $allSettings = PerformanceSetting::get();

        return response()->json([
            "message" => 'Key saved successfully',
            "client" => $clientKey,
            "profile" => $profile,
            "pms_settings" => $currentPmsSettings,
            'all_settings' => $allSettings
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
