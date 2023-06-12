<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\KeyPerformanceReview;


class KeyPerformanceReviewController extends Controller
{
     
    public function deleteEmployeeKPI(Request $request){ 
        $msg = 'KPI has been deleted';
        if(!$request->id){
            return false;
        }
        KeyPerformanceReview::where('id', $request->id)->delete();  
        

        $profile = Profile::where('ecode', $request['user_ecode'])
        ->with(
            'teams.reviews.keyReview',
            'teams.company',
            'reviews.keyReview',
            'company')
        ->with('reviews',function ($q) {
            $q->where('year', Carbon::now()->format('Y'));
        })->first(); 

        return response()->json([
            'message' => $msg,
            'profile' => $profile
        ], 200);
    }
}
