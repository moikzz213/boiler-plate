<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Company;
use App\Models\Profile;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Jobs\SendNotification;
use Illuminate\Support\Carbon;
use App\Models\PerformanceSetting;
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
        $msg = 'KPI status changed to '.$request->newStatus;

        $defaultDayReminder = Notification::where('meta_key', 'default_reminder_days')->first();

        $reminderDate = date('Y-m-d', strtotime("+". $defaultDayReminder->meta_value." days"));
        if($request->newStatus == 'inreview'){

            $closingDate = Carbon::now()->addDays($request->allowedDays);
            $query->update(['status' => $request->newStatus, 'closing_date' => $closingDate, 'reminder_date' => $reminderDate]);

        }elseif($request->newStatus == 'submitted'){
            $msg = 'KPI for this employee is now complete.';
            $query->update(['status' => $request->newStatus, 'closing_date' => null, 'reminder_date' => null]);
        }else{
            $query->update(['status' => $request->newStatus, 'closing_date' => $closingDate, 'reminder_date' => $reminderDate]);
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

        SendNotification::dispatchAfterResponse(['data' => $query, 'isOpening' => false, 'closingSetting' => $request['closingDateSetting'],'allowedDays' => $request['allowedDays'], 'managerEmail' => $request['managerEmail'], 'managerName' => $request['managerName']])->onQueue('processing');

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

    function getReviewForGraph($state){
        // $stateArray = array('setting', 'midyear', 'yearend');

        // graph array
        $company = new Company;
        
        $data = $company
        ->whereHas('profiles', function ($q) {
            $q->where('is_regular', true)->where('status', 'Active');
        })
        ->whereHas('settings', function ($q) use($state) { 
            $q->where(['state' => $state, 'year' => Carbon::now()->format('Y')]);
        
        })
        ->withCount([
            'profiles',
            'profiles as open' => function ($q) {
                $q->whereHas('company', function($query){
                    $query->whereHas('settings', function($qry){
                        $qry->where('status', 'open');
                    });
                })->doesntHave('reviews');
            }, 
            'profiles as in_progress' => function ($query) {
                $query->whereHas('reviews', function($query){
                    $query->where('status', 'inprogress');
                });
            },
            'profiles as in_review' => function ($query) {
                $query->whereHas('reviews', function($query){
                    $query->where('status', 'inreview');
                });
            },
            'profiles as submitted' => function ($query) {
                $query->whereHas('reviews', function($query){
                    $query->where('status', 'submitted');
                });
            },
            'profiles as locked' => function ($q) {
                $q->whereHas('company', function($query){
                    $query->doesntHave('settings')
                    ->orWhereHas('settings', function($query){
                        $query->where('status','closed'); 
                    });
                });
            },
        ])->orderBy('title','ASC')->get(); 
       
        $companyData = $company->whereHas('profiles', function ($q) {
            $q->where('is_regular', true)->where('status', 'Active');
        })->orderBy('title','ASC')->get();


        $settingsCompanyData = $company->whereHas('profiles', function ($q) {
            $q->where('is_regular', true)->where('status', 'Active');
        })
        ->whereHas('settings', function ($q) use($state) { 
            $q->whereNotIn('status',array('locked','closed'));
            
        })->with('settings', function ($q) use($state) { 
            $q->whereNotIn('status',array('locked','closed'));
            
        })->orderBy('title','ASC')->get();
        
        $company1IDs = $data->pluck('id')->toArray();
        $company2IDs = $settingsCompanyData->pluck('id')->toArray();

        
        foreach($companyData AS $k => $v){
           if(in_array($v->id,$company1IDs)) unset($companyData[$k]);
           
           if($settingsCompanyData && count($settingsCompanyData) > 0){
                foreach($settingsCompanyData AS $kk => $vv){
                    if($v->id == $vv->id) { 
                        if($vv->settings[0]->state == 'setting'){
                            $state = 'set';
                        }elseif($vv->settings[0]->state == 'midyear'){
                            $state = 'mid';
                        }else{
                            $state = 'end';
                        }
                        $v->sub_title = $state;
                    }
                }
           }
           $v->locked = 100;
        }
        
        $data = $data->merge($companyData);
        
        return response()->json([
            'data' => $data
        ], 200);
    }
}
