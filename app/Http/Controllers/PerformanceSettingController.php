<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Profile;
use Illuminate\Http\Request;
use App\Jobs\SendNotification;
use Illuminate\Support\Carbon;
use App\Models\PerformanceSetting;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class PerformanceSettingController extends Controller
{
    public function getSingleSetting($id)
    {
        $pmsSetting = PerformanceSetting::where('id', $id)->with('company')->first();
        return response()->json($pmsSetting, 200);
    }

    public function getPerformanceSettings()
    {
        // $pmsSettings = PerformanceSetting::with('company')->paginate(20);
        // return response()->json($pmsSettings, 200);
        $pmsSettings = QueryBuilder::for(PerformanceSetting::class)
        ->allowedFilters([
            'year',
            AllowedFilter::callback('company', function ($query, $value) {
                $query->where('company_id', $value);
            })->ignore('null')
        ])
        ->with('company')
        ->paginate(10)
        ->appends(request()->query());
         return response()->json($pmsSettings, 200);
    }

    public function saveSetting(Request $request)
    {
        $currentDate = Carbon::now();

        $status = 'open';
        if($currentDate >= $request['annual_kpi_setting_start'] && $currentDate <= $request['annual_kpi_setting_end']){
            $state = 'setting';
        }elseif($currentDate >= $request['mid_year_review_start'] && $currentDate <= $request['mid_year_review_end']){
            $state = 'midyear';
        }elseif($currentDate >= $request['end_year_review_start'] && $currentDate <= $request['end_year_review_end']){
            $state = 'yearend';
        }else{
            $status = 'locked';
            $state = 'closed';
        }
        $pmsArray = array(
            'year' => $request['year'],
            'state' => $state,
            'status' => $status,
            'company_id' => $request['company_id'],
            'employee_review_allowed_days' => $request['employee_review_allowed_days'],
            'probation_final_review_end' => $request['probation_final_review_end'],
            'probation_final_review_start' => $request['probation_final_review_start'],
            'probation_first_review_end' => $request['probation_first_review_end'],
            'probation_first_review_start' => $request['probation_first_review_start'],
            'probation_kpi_setting' => $request['probation_kpi_setting'],
            'annual_kpi_setting_start' => $request['annual_kpi_setting_start'],
            'annual_kpi_setting_end' => $request['annual_kpi_setting_end'],
            'mid_year_review_start' => $request['mid_year_review_start'],
            'mid_year_review_end' => $request['mid_year_review_end'],
            'end_year_review_start' => $request['end_year_review_start'],
            'end_year_review_end' => $request['end_year_review_end'],
        );
        $profile = array();
        if($request['id']){
            $setting = PerformanceSetting::where('id', $request['id'])->first();
            $setting->update($pmsArray);

            $reviewResult = Review::where('company_id', $request['company_id'])->update(["state" => $state, 'status' => $status]);

            $profile = Profile::where('ecode', $request['profile_ecode'])
            ->with(
                'teams.reviews.keyReview',
                'teams.company',
                'reviews.keyReview',
                'company')
            ->with('reviews',function ($q) {
                $q->where('year', Carbon::now()->format('Y'));
            })->first();

        }else{
            // check if the company and year are already present in the database
            $check = PerformanceSetting::where([
                'company_id' => $request['company_id'],
                'year' => $request['year']
            ])->first();

            if($check){
                return response()->json([
                    'message' => 'PMS Settings already exists'
                ], 422);
            }

            $setting = PerformanceSetting::create($pmsArray); 
            
            if($setting && $status == 'open'){
                $query = Profile::whereHas('teams', function($q) {
                    $q->where(['status' => 'Active', 'is_regular' => 1]);
                })->with('teams')->get();

                // Send Notification to all employees that have a team only. Manager without a team member will not receive the notification.
                SendNotification::dispatchAfterResponse(['data' => $query, 'isOpening' => true, 'closingSetting' => 'setting','allowedDays' => null, 'managerEmail' => null, 'managerName' => null, 'year' => $request['year']])->onQueue('processing');
            }
        }

        return response()->json([
            'message' => 'PMS settings saved successfully',
            'result' => $setting,
            'profile' => $profile
        ], 200);
    }
}
