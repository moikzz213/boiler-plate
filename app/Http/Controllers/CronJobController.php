<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Profile;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Jobs\SendNotification;
use Illuminate\Support\Carbon;
use App\Models\PerformanceSetting;

class CronJobController extends Controller
{
    /**
     * 
     *  Opening PMS for the year 
     *  Run every 1st day of the month
     *  Regular Employees only
     *  Manager without a team member will not receive the notification.
     *  See API Route for the URL
     * * */
   
    public function settingOpening(Request $request){

        if(!$request->input('key') || !$request->input('c') || ( $request->input('key') != 'Moikzz' || $request->input('c') != 'Ghassan')){
            return json_encode(array("Message" => 'Invalid access', 'Status Code' => 403));
        }

        $lastYear = date('Y',strtotime("-1 year"));
        $currentYear = date('Y');

        $current_month_day = date('m-d');
        
        $currentSetting = PerformanceSetting::where([
            'year' => $currentYear
        ])->pluck('company_id');

        
        $lastYearSetting = PerformanceSetting::where([
            'year' => $lastYear
        ])->whereNotIn('company_id', $currentSetting)->get();

        if(!$lastYearSetting || count($lastYearSetting) == 0){
            return response()->json([
                'message' => 'Kindly add KPI manually / KPI already created.'
            ], 422);
        } 
       
        foreach($lastYearSetting AS $k => $v){
            $pmsArray = array(
                'year' => $currentYear,
                'state' => 'setting',
                'status' => 'open',
                'company_id' => $v['company_id'],
                'employee_review_allowed_days' => $v['employee_review_allowed_days'],
                'probation_final_review_end' => $v['probation_final_review_end'],
                'probation_final_review_start' => $v['probation_final_review_start'],
                'probation_first_review_end' => $v['probation_first_review_end'],
                'probation_first_review_start' => $v['probation_first_review_start'],
                'probation_kpi_setting' => $v['probation_kpi_setting'],
                'annual_kpi_setting_start' => date('Y-m-d', strtotime($v['annual_kpi_setting_start']. '+1 year')),
                'annual_kpi_setting_end' => date('Y-m-d', strtotime($v['annual_kpi_setting_end']. '+1 year')),
                'mid_year_review_start' => date('Y-m-d', strtotime($v['mid_year_review_start']. '+1 year')),
                'mid_year_review_end' => date('Y-m-d', strtotime($v['mid_year_review_end']. '+1 year')),
                'end_year_review_start' => date('Y-m-d', strtotime($v['end_year_review_start']. '+1 year')),
                'end_year_review_end' => date('Y-m-d', strtotime($v['end_year_review_end']. '+1 year')),
            );
            if($current_month_day ==  date('m-d', strtotime($v['annual_kpi_setting_start']))){
                $setting = PerformanceSetting::create($pmsArray);

                if($setting){
                    $query = Profile::whereHas('teams', function($q) use ($v) {
                        $q->where(['status' => 'Active', 'is_regular' => 1, 'company_id' => $v['company_id']]);
                    })->with('teams', function($q){
                        $q->where('is_regular', 1);
                    })->get();
                    
                    // Send Notification to all employees that have a team only. Manager without a team member will not receive the notification.
                    if($query && count($query) > 0){
                        foreach($query AS $k => $vb){
                            foreach($vb->teams AS $kk => $vv){  
                                $member = Profile::where('ecode', $vv->ecode)->first();
                                if($member->company_id == $v['company_id']){
                                    $member->reviews()->create([
                                        'performance_settings_id'   => $setting->id,
                                        'company_id'                => $v['company_id'],
                                        'state'                     => 'setting',
                                        'status'                     => 'open',
                                        'reminder_date'             => Carbon::now()->addDays(3),
                                        'year'                      => $setting->year,
                                        'type'                      => 'regular',
                                        'author'                    => 'system'
                                    ]);
                                }
                            }
                        }
                        SendNotification::dispatchAfterResponse(['data' => $query, 'isOpening' => true, 'closingSetting' => 'setting','allowedDays' => null, 'managerEmail' => null, 'managerName' => null, 'year' => $currentYear])->onQueue('processing');
                    } 
                }
            }
        } 

        return json_encode(array("Message" => 'Invalid access', 'Status Code' => 401));
    }

    /**
     * 
     *  Mid Year & End Year Opening
     *  Run every 1st day and last day of the month
     *  Regular Employees only
     *  Manager without a team member will not receive the notification.
     *  See API Route for the URL
     */

    public function midYearEndOpeningAndClosing(Request $request){

        if(!$request->input('key') || !$request->input('c') || ( $request->input('key') != 'Moikzz' || $request->input('c') != 'Ghassan')){
            return json_encode(array("Message" => 'Invalid access', 'Status Code' => 403));
        }
       
        $defaultDayReminder = Notification::where('meta_key', 'default_reminder_days')->first();  
        $reminderEvery = date('Y-m-d', strtotime("+". $defaultDayReminder->meta_value." days"));

        $currentYear = date('Y');
        $nextYear = date('Y', strtotime("+1 year"));
        $current_month_day = date('Y-m-d');
        
        $currentSetting = PerformanceSetting::where([
            'year' => $currentYear
        ])->orWhere('year', $nextYear)->get(); 

        if(!$currentSetting || count($currentSetting) == 0){
            return response()->json([
                'message' => 'Kindly add KPI manually / KPI already created.'
            ], 422);
        } 
       
        foreach($currentSetting AS $k => $v){

            // Check date if Mid Year Opening
            if($current_month_day ==  date('Y-m-d', strtotime($v['mid_year_review_start']))){
                $setting = PerformanceSetting::where('id', $v->id)->first();
                if($setting){
                    $setting->update(['state' => 'midyear', 'status' => 'open']);
                    $query = Profile::whereHas('teams', function($q) use ($v) {
                        $q->where(['status' => 'Active', 'is_regular' => 1, 'company_id' => $v['company_id']]);
                    })->with('teams', function($q){
                        $q->where('is_regular', 1);
                    })->get();
                    
                    // Send Notification to all employees that have a team only. 
                    if($query && count($query) > 0){ 
                        Review::where('company_id', $v['company_id'])->update(['state' => 'midyear', 'status' => 'open', 'reminder_date' => $reminderEvery]);
                        SendNotification::dispatchAfterResponse(['data' => $query, 'isOpening' => true, 'closingSetting' => 'midyear','allowedDays' => null, 'managerEmail' => null, 'managerName' => null, 'year' => $currentYear])->onQueue('processing');
                    }
                     
                }

                // Check date if Year End Opening
            }elseif($current_month_day ==  date('Y-m-d', strtotime($v['end_year_review_start']))){
                $setting = PerformanceSetting::where('id', $v->id)->first();
                if($setting){
                    $setting->update(['state' => 'yearend', 'status' => 'open']);
                    $query = Profile::whereHas('teams', function($q) use ($v) {
                        $q->where(['status' => 'Active', 'is_regular' => 1, 'company_id' => $v['company_id']]);
                    })->with('teams')->get();
                    
                    // Send Notification to all employees that have a team only. Manager without a team member will not receive the notification.
                    if($query && count($query) > 0){
                        Review::where('company_id', $v['company_id'])->update(['state' => 'yearend', 'status' => 'open', 'reminder_date' => $reminderEvery]);
                        SendNotification::dispatchAfterResponse(['data' => $query, 'isOpening' => true, 'closingSetting' => 'yearend','allowedDays' => null, 'managerEmail' => null, 'managerName' => null, 'year' => $currentYear])->onQueue('processing');
                    }
                }

                // Check date if Mid Year Closing
            }elseif($current_month_day ==  date('Y-m-d', strtotime($v['mid_year_review_end']))){
                $setting = PerformanceSetting::where('id', $v->id)->first();
                if($setting){
                    $setting->update(['state' => 'midyear', 'status' => 'locked']);
                    $query = Profile::whereHas('teams', function($q) use ($v) {
                        $q->where(['status' => 'Active', 'is_regular' => 1, 'company_id' => $v['company_id']]);
                    })->with('teams', function($q){
                        $q->where('is_regular', 0);
                    })->get();
                    
                    if($query && count($query) > 0){
                        Review::where('company_id', $v['company_id'])->update(['state' => 'midyear', 'status' => 'closed', 'reminder_date' => null]);
                    }
                }

                // Check date if Year End Closing
            }elseif($current_month_day ==  date('Y-m-d', strtotime($v['end_year_review_end']))){
                $setting = PerformanceSetting::where('id', $v->id)->first();
                if($setting){
                    $setting->update(['state' => 'yearend', 'status' => 'locked']);
                    $query = Profile::whereHas('teams', function($q) use ($v) {
                        $q->where(['status' => 'Active', 'is_regular' => 1, 'company_id' => $v['company_id']]);
                    })->with('teams', function($q){
                        $q->where('is_regular', 0);
                    })->get();
                    
                    if($query && count($query) > 0){
                        Review::where('company_id', $v['company_id'])->update(['state' => 'yearend', 'status' => 'closed', 'reminder_date' => null]);
                    }
                     
                }

                // Check date if Settings Closing
            }elseif($current_month_day ==  date('Y-m-d', strtotime($v['annual_kpi_setting_end']))){
                $setting = PerformanceSetting::where('id', $v->id)->first();
                if($setting){
                    $setting->update(['state' => 'setting', 'status' => 'locked']);
                    $query = Profile::whereHas('teams', function($q) use ($v) {
                        $q->where(['status' => 'Active', 'is_regular' => 1, 'company_id' => $v['company_id']]);
                    })->with('teams', function($q){
                        $q->where('is_regular', 0);
                    })->get();
                    
                    if($query && count($query) > 0){
                        Review::where('company_id', $v['company_id'])->update(['state' => 'setting', 'status' => 'closed', 'reminder_date' => null]);
                    } 
                }
            }

            
        } 

        return json_encode(array("Message" => 'Invalid access', 'Status Code' => 403));
    }

    /**
     * 
     *  Probation Setting Opening
     *  Run daily
     *  Probation Employees only
     *  Manager without a probation team member will not receive the notification.
     *  See API Route for the URL
     */

    public function probationSettingOpening(Request $request){

        if(!$request->input('key') || !$request->input('c') || ( $request->input('key') != 'Moikzz' || $request->input('c') != 'Ghassan')){
            return json_encode(array("Message" => 'Invalid access', 'Status Code' => 403));
        }
       
        $defaultDayReminder = Notification::where('meta_key', 'default_reminder_days')->first();  
        $reminderEvery = date('Y-m-d', strtotime("+". $defaultDayReminder->meta_value." days"));
        
        $currentYear = Carbon::now()->format('Y');
        $nextYear = date('Y', strtotime("+1 year"));

        $current_month_day = date('Y-m-d');
        
        $currentSetting = PerformanceSetting::where([
            'year' => $currentYear
        ])->orWhere('year', $nextYear)->get(); 

        if(!$currentSetting || count($currentSetting) == 0){
            return response()->json([
                'message' => 'Kindly add KPI manually / KPI already created.'
            ], 422);
        } 
      
        foreach($currentSetting AS $k => $v){  
            
            $query = Profile::whereHas('teams', function($q) use ($v) {
                $q->doesntHave('reviews')
                ->where(['status' => 'Active', 'is_regular' => 0, 'company_id' => $v['company_id']]) 
                ->where(function($qq) {
                    $qq->where(['doj' => Carbon::now()->format('Y-m-d')])
                    ->orWhere(['doj' => Carbon::now()->subDays(3)->format('Y-m-d')])
                    ->orWhere(['doj' => Carbon::now()->subDays(6)->format('Y-m-d')])
                    ->orWhere(['doj' => Carbon::now()->subDays(9)->format('Y-m-d')])
                    ->orWhere(['doj' => Carbon::now()->subDays(12)->format('Y-m-d')]);
                });
                
            })
            ->with('teams', function($q){
                $q->where('is_regular', 0);
            })->get();
         
            // Send Notification to all employees that have a team only. 
            if($query && count($query) > 0){
                SendNotification::dispatchAfterResponse(['data' => $query, 'isOpening' => true, 'closingSetting' => 'setting','allowedDays' => null, 'employee_type' => 'probation', 'year' => $currentYear])->onQueue('processing');
            } 
            
        } 

        return json_encode(array("Message" => 'Invalid access', 'Status Code' => 401));
    }

    /**
     * 
     *  Probation First & Final Review - Opening & Closing
     *  Run daily
     *  Probation Employees only
     *  Manager without a probation team member will not receive the notification.
     *  See API Route for the URL
     */

     public function probationFirstFinalReview(Request $request){
        if(!$request->input('key') || !$request->input('c') || ( $request->input('key') != 'Moikzz' || $request->input('c') != 'Ghassan')){
            return json_encode(array("Message" => 'Invalid access', 'Status Code' => 403));
        }

        $defaultDayReminder = Notification::where('meta_key', 'default_reminder_days')->first();  
        $reminderEvery = date('Y-m-d', strtotime("+". $defaultDayReminder->meta_value." days"));

        $currentYear = date('Y');
        $nextYear = date('Y', strtotime("+1 year"));

        $current_month_day = date('Y-m-d');
        
        $currentSetting = PerformanceSetting::where([
            'year' => $currentYear
        ])->orWhere('year', $nextYear)->get(); 

        if(!$currentSetting || count($currentSetting) == 0){
            return response()->json([
                'message' => 'Kindly add KPI manually / KPI already created.'
            ], 422);
        }
      
        foreach($currentSetting AS $k => $v){
          //  dd(Carbon::now()->subDays($v['probation_first_review_end']), Carbon::now()->subDays($v['probation_final_review_end']));
            $firstReview = Profile::whereHas('teams', function($q) use ($v) { 
                $q->where(['status' => 'Active', 'is_regular' => 0, 'company_id' => $v['company_id']])
                    ->where(['doj' => Carbon::now()->subDays($v['probation_first_review_start'])->format('Y-m-d')]);
            })
            ->with('teams', function($q) use ($v){
                $q->where(['status' => 'Active', 'is_regular' => 0, 'company_id' => $v['company_id']])
                ->where(['doj' => Carbon::now()->subDays($v['probation_first_review_start'])->format('Y-m-d')]);
            })->get();
            
         
            // Notification: First Review Open
            if($firstReview && count($firstReview) > 0){
              SendNotification::dispatchAfterResponse(['data' => $firstReview, 'isOpening' => true, 'closingSetting' => 'first_review','allowedDays' => null, 'employee_type' => 'probation', 'year' => $currentYear])->onQueue('processing');
            }

            $finalReview = Profile::whereHas('teams', function($q) use ($v) { 
                $q->where(['status' => 'Active', 'is_regular' => 0, 'company_id' => $v['company_id']])
                    ->where(['doj' => Carbon::now()->subDays($v['probation_final_review_start'])->format('Y-m-d')]); 
            })
            ->with('teams', function($q) use ($v){
                $q->where(['status' => 'Active', 'is_regular' => 0, 'company_id' => $v['company_id']])
                ->where(['doj' => Carbon::now()->subDays($v['probation_final_review_start'])->format('Y-m-d')]);
            })->get();
              
             // Notification: Final Review Open
            if($finalReview && count($finalReview) > 0){
                SendNotification::dispatchAfterResponse(['data' => $finalReview, 'isOpening' => true, 'closingSetting' => 'final_review','allowedDays' => null, 'employee_type' => 'probation', 'year' => $currentYear])->onQueue('processing');
            }
           
            $closingReviews = Profile::whereHas('reviews', function($q) use ($v){ 
                            $q->where(['doj' => Carbon::now()->subDays($v['probation_first_review_end'])->format('Y-m-d')])
                            ->orWhere(['doj' => Carbon::now()->subDays($v['probation_final_review_end'])->format('Y-m-d')]); 
                        })->where(['is_regular' => 0, 'company_id' => $v['company_id']])
                        ->get();
            
            if($closingReviews && count($closingReviews) > 0){
               foreach($closingReviews AS $kz => $vb) {
                    $vb->reviews()->update(['status' =>'closed', 'closing_date' => null, 'reminder_date' => null]);
               } 
            }      
        } 
       
        return json_encode(array("Message" => 'Invalid access', 'Status Code' => 401));
     }

    /**
     * 
     *  Reminder to managers
     *  Run daily
     *  Probation & Regular Employees
     *  Manager without a probation team member will not receive the notification.
     *  See API Route for the URL
     */

    public function dailyReminderToManagers(Request $request){
        if(!$request->input('key') || !$request->input('c') || ( $request->input('key') != 'Moikzz' || $request->input('c') != 'Ghassan')){
            return json_encode(array("Message" => 'Invalid access', 'Status Code' => 403));
        }
    }
}