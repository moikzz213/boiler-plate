<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\PerformanceSetting;

class PerformanceSettingController extends Controller
{
    public function getSingleSetting($id)
    {
        $pmsSetting = PerformanceSetting::where('id', $id)->with('company')->first();
        return response()->json($pmsSetting, 200);
    }

    public function getPaginatedPerformanceSettings()
    {
        $pmsSettings = PerformanceSetting::with('company')->paginate(20);
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

            // Send Notification to all employees
            // Code below
        }

        return response()->json([
            'message' => 'PMS settings saved successfully',
            'result' => $setting,
            'profile' => $profile
        ], 200);
    }
}
