<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Profile;
use App\Jobs\SendNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\KeyPerformanceReview;

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

    public function kpiSubmitted(Request $request){
       
        $query = Review::where('id', $request->reviewID)->first(); 
        if($request->newStatus == 'inreview'){ 
            
            $closingDate = Carbon::now()->addDays($request->allowedDays);
            
            $query->update(['status' => $request->newStatus, 'closing_date' => $closingDate]); 
        }else{
            $query->update(['status' => $request->newStatus]); 
        }

        if($request->newStatus !== 'submitted'){ 
            $msg = 'KPI status changed to '.$request->newStatus; 
        }else{ 
            $msg = 'KPI for this employee is now complete.'; 
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

        SendNotification::dispatchAfterResponse(['data' => $query, 'closingSetting' => $request['closingDateSetting'],'allowedDays' => $request['allowedDays'], 'managerEmail' => $request['managerEmail'], 'managerName' => $request['managerName']])->onQueue('processing');

        return response()->json([
            'message' => $msg,
            'profile' => $profile
        ], 200);
    }

    public function createEmployeeKPI(Request $request){ 
        $msg = 'KPI has been updated';
       
        $weightage = explode('%', $request->data['data']['weightage']);
        if(@$request->data['state'] == 'final'){
            $query = KeyPerformanceReview::where('id', $request->data['data']['id'])->first(); 
            $query->update([ 
                'achievement_yearend'      => @$request->data['data']['achievement_yearend']
            ]);
            $msg = 'Final Review for this KPI has been updated';
        }elseif(@$request->data['state'] == 'mid'){
          
            $query = KeyPerformanceReview::where('id', $request->data['data']['id'])->first(); 
            $query->update([ 
                'achievement_midyear'      => @$request->data['data']['achievement_midyear'],
                'revised_annual_target'    => @$request->data['data']['revised_annual_target'],
            ]);
            $msg = 'Review for this KPI has been updated';
        }else{
            if($request->data['action'] == 'add'){
                $query = Review::where('id', $request->reviewID)->first(); 
                $query->update(['status' => 'inprogress']);
                $query->keyReview()->create([
                    'title'                 => $request->data['data']['title'],
                    'industry'              => @$request->data['industryTitle'],
                    'definition'            => @$request->data['data']['definition'],
                    'formula'               => @$request->data['data']['formula'],
                    'measures'              => @$request->data['data']['measures'],
                    'calculation_example'   => @$request->data['data']['calculation_example'],
                    'evaluation_pattern'    => @$request->data['data']['evaluation_pattern'],
                    'type'                  => $request->data['data']['type'],
                    'ecd_type'              => @$request->data['data']['ecd_type'],
                    'target_type'           => @$request->data['data']['target_type'],
                    'target'                => @$request->data['data']['target'],
                    'subordinate_measures'  => @$request->data['data']['subordinate_measures'], 
                    'weightage'             => @$weightage[0] ? $weightage[0] : 0
                ]);

                $msg = 'KPI has been created';                
            }else{
                $query = KeyPerformanceReview::where('id', $request->data['data']['id'])->first(); 
                $query->update([ 
                    'measures'              => @$request->data['data']['measures'], 
                    'target_type'           => @$request->data['data']['target_type'],
                    'target'                => @$request->data['data']['target'], 
                    'weightage'             => @$weightage[0] ? $weightage[0] : 0
                ]);
                $msg = 'KPI has been updated';
            }
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