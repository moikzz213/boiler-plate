<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ReviewController extends Controller
{
    public function KeyPerformance($id, $year){
         
        $query = Review::where([
            'profile_id' => $id,
            'year' => $year
        ])->with('keyReview')->first(); 

        return response()->json([
            'result' => $query
        ], 200);
    }
    

    public function createEmployeeKPI(Request $request){ 
        $msg = 'KPI has been updated';
        if($request->data['action'] == 'add'){
            $weightage = explode('%', $request->data['data']['weightage']);
            $query = Review::where('id', $request->reviewID)->first(); 
            $query->update(['status' => 'inprogress']);
            $query->keyReview()->create([
                'title'                 => $request->data['data']['title'],
                'industry'              => $request->data['industryTitle'],
                'definition'            => $request->data['data']['definition'],
                'formula'               => $request->data['data']['formula'],
                'measures'              => $request->data['data']['measures'],
                'calculation_example'   => $request->data['data']['calculation_example'],
                'evaluation_pattern'    => $request->data['data']['evaluation_pattern'],
                'type'                  => $request->data['data']['type'],
                'ecd_type'              => $request->data['data']['ecd_type'],
                'target_type'           => $request->data['data']['target_type'],
                'target'                => $request->data['data']['target'],
                'subordinate_measures'               => $request->data['data']['subordinate_measures'], 
                'weightage'             => @$weightage[0] ? $weightage[0] : 0
            ]);

            $msg = 'KPI has been created';
        }


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