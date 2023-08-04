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
   
    public function setting_opening(Request $request){

        if(!$request->input('key') || !$request->input('c') || ( $request->input('key') != 'Moikzz' || $request->input('c') != 'Ghassan')){
            return json_encode(array("Message" => 'Invalid access', 'Status Code' => 403));
        } 

        $current_month_day = date('m-d');  

        $currentSetting = PerformanceSetting::where(['state' => 'yearend', 'status' => 'closed'])->get(); 
        
        if(!$currentSetting || count($currentSetting) == 0){
            return response()->json([
                'message' => 'Kindly add KPI manually / KPI already created.'
            ], 422);
        }
       
        foreach($currentSetting AS $k => $v){
            
            $pmsArray = array(
                'year' => (int)$v['year'] + 1,
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
                        $q->where(['is_regular' => 1, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active']);
                    })->whereIn('status', ['active', 'Active'])->with('teams', function($q) use($v){
                        $q->where(['is_regular' => 1, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active']);
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
                        SendNotification::dispatchAfterResponse(['data' => $query, 'isOpening' => true, 'closingSetting' => 'setting','allowedDays' => null, 'managerEmail' => null, 'managerName' => null, 'year' => $v['year']])->onQueue('processing');
                     
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

    public function mid_year_end_opening_and_closing(Request $request){
        
        if(!$request->input('key') || !$request->input('c') || ( $request->input('key') != 'Moikzz' || $request->input('c') != 'Ghassan')){
            return json_encode(array("Message" => 'Invalid access', 'Status Code' => 403));
        }

        $currentSetting = PerformanceSetting::where('status' ,'!=', 'locked')->get();  

        if(!$currentSetting || count($currentSetting) == 0){
            return response()->json([
                'message' => 'Kindly add KPI manually / KPI already created.'
            ], 422);
        } 
       
        $defaultDayReminder = Notification::where('meta_key', 'default_reminder_days')->first();
        $reminderEvery = date('Y-m-d', strtotime("+". $defaultDayReminder->meta_value." days"));
 
        $current_month_day = date('Y-m-d'); 
       
        foreach($currentSetting AS $k => $v){

              // Check date if Mid Year Closing
              if($current_month_day ==  date('Y-m-d', strtotime($v['mid_year_review_end'] . ' +1 day'))){
              
                $setting = PerformanceSetting::where('id', $v->id)->first();
                if($setting){
                    $setting->update(['status' => 'closed']);
                    $query = Profile::whereHas('teams', function($q) use ($v) {
                        $q->where(['is_regular' => 1, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active']);
                    })->whereIn('status', ['active', 'Active'])->with('teams', function($q){
                        $q->where(['is_regular' => 1, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active']);
                    })->get();
                    
                    if($query && count($query) > 0){
                        Review::where(['type' => 'regular', 'performance_settings_id' => $v->id])->update(['state' => 'midyear', 'status' => 'closed', 'reminder_date' => null]);
                    }
                }

                // Check date if Year End Closing
            }elseif($current_month_day ==  date('Y-m-d', strtotime($v['end_year_review_end'] . ' +1 day'))){
               
                $setting = PerformanceSetting::where('id', $v->id)->first();
                if($setting){
                    $setting->update(['status' => 'closed']);
                    $query = Profile::whereHas('teams', function($q) use ($v) {
                        $q->where(['is_regular' => 1, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active']);
                    })->whereIn('status', ['active', 'Active'])->with('teams', function($q){
                        $q->where(['is_regular' => 1, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active']);
                    })->get();
                    
                    if($query && count($query) > 0){
                        Review::where(['type' => 'regular', 'performance_settings_id' => $v->id])->update(['state' => 'yearend', 'status' => 'closed', 'reminder_date' => null]);
                    }
                }

                // Check date if Settings Closing
            }elseif($current_month_day ==  date('Y-m-d', strtotime($v['annual_kpi_setting_end']. ' +1 day'))){
                $setting = PerformanceSetting::where('id', $v->id)->first();
                if($setting){
                    $setting->update(['status' => 'closed']);
                    $query = Profile::whereHas('teams', function($q) use ($v) {
                        $q->where(['is_regular' => 1, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active']);
                    })->whereIn('status', ['active', 'Active'])->with('teams', function($q){
                        $q->where(['is_regular' => 1, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active']);
                    })->get();
                    
                    if($query && count($query) > 0){
                        Review::where(['type' => 'regular', 'performance_settings_id' => $v->id])->update(['state' => 'setting', 'status' => 'closed', 'reminder_date' => null]);
                    }
                }
            }
           
            // Check date if Mid Year Opening
            if($current_month_day ==  date('Y-m-d', strtotime($v['mid_year_review_start']))){
                $setting = PerformanceSetting::where('id', $v->id)->first();
                if($setting){
                    $setting->update(['state' => 'midyear', 'status' => 'open']);
                    
                    $query = Profile::whereHas('teams', function($q) use ($v) {
                        $q->where([ 'is_regular' => 1, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active']);
                    })->whereIn('status', ['active', 'Active'])->with('teams', function($q) use($v){
                        $q->where(['is_regular' => 1, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active']);
                    })->get();  
                   
                    // Send Notification to all employees that have a team only. 
                    if($query && count($query) > 0){  
                        Review::where(['type' => 'regular', 'performance_settings_id' => $v->id])->update(['state' => 'midyear', 'status' => 'open', 'reminder_date' => $reminderEvery]);
                        SendNotification::dispatchAfterResponse(['data' => $query, 'isOpening' => true, 'closingSetting' => 'midyear','allowedDays' => null, 'managerEmail' => null, 'managerName' => null, 'year' => $v['year']])->onQueue('processing');
                    }
                }

                // Check date if Year End Opening
            }elseif($current_month_day ==  date('Y-m-d', strtotime($v['end_year_review_start']))){
                
                $setting = PerformanceSetting::where('id', $v->id)->first();
                if($setting){
                    $setting->update(['state' => 'yearend', 'status' => 'open']);
                    $query = Profile::whereHas('teams', function($q) use ($v) {
                        $q->where(['is_regular' => 1, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active']);
                    })->whereIn('status', ['active', 'Active'])->with('teams', function($q) use ($v) {
                        $q->where(['is_regular' => 1, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active']);
                    })->get();
                  
                    // Send Notification to all employees that have a team only. Manager without a team member will not receive the notification.
                    if($query && count($query) > 0){ 
                        Review::where(['type' => 'regular', 'performance_settings_id' => $v->id])->update(['state' => 'yearend', 'status' => 'open', 'reminder_date' => $reminderEvery]);
                        SendNotification::dispatchAfterResponse(['data' => $query, 'isOpening' => true, 'closingSetting' => 'yearend','allowedDays' => null, 'managerEmail' => null, 'managerName' => null, 'year' => $v['year']])->onQueue('processing');
                    }
                }

            } 
        }
        return json_encode(array("Message" => 'Invalid access', 'Status Code' => 401));
    }

    /**
     * 
     *  Probation Setting Opening
     *  Run daily
     *  Probation Employees only
     *  Manager without a probation team member will not receive the notification.
     *  See API Route for the URL
     */

    public function probation_setting_opening(Request $request){

        if(!$request->input('key') || !$request->input('c') || ( $request->input('key') != 'Moikzz' || $request->input('c') != 'Ghassan')){
            return json_encode(array("Message" => 'Invalid access', 'Status Code' => 403));
        }  
        
        $currentSetting = PerformanceSetting::where('status' ,'!=', 'locked')->get();  

        if(!$currentSetting || count($currentSetting) == 0){
            return response()->json([
                'message' => 'Kindly add KPI manually / KPI already created.'
            ], 422);
        } 
      
        foreach($currentSetting AS $k => $v){  
            
            $query = Profile::whereHas('teams', function($q) use ($v) {
                $q->doesntHave('reviews')
                ->where(['is_regular' => 0, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active'])
                ->where(function($qq) {
                    $qq->where(['doj' => Carbon::now()->format('Y-m-d')])
                    ->orWhere(['doj' => Carbon::now()->subDays(3)->format('Y-m-d')])
                    ->orWhere(['doj' => Carbon::now()->subDays(6)->format('Y-m-d')])
                    ->orWhere(['doj' => Carbon::now()->subDays(9)->format('Y-m-d')])
                    ->orWhere(['doj' => Carbon::now()->subDays(12)->format('Y-m-d')]);
                }); 
            })
            ->with('teams', function($q){
                $q->doesntHave('reviews')
                ->where(['is_regular' => 0, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active'])
                ->where(function($qq) {
                    $qq->where(['doj' => Carbon::now()->format('Y-m-d')])
                    ->orWhere(['doj' => Carbon::now()->subDays(3)->format('Y-m-d')])
                    ->orWhere(['doj' => Carbon::now()->subDays(6)->format('Y-m-d')])
                    ->orWhere(['doj' => Carbon::now()->subDays(9)->format('Y-m-d')])
                    ->orWhere(['doj' => Carbon::now()->subDays(12)->format('Y-m-d')]);
                });
            })->get();
         
            // Send Notification to all employees that have a team only. 
            if($query && count($query) > 0){
                SendNotification::dispatchAfterResponse(['data' => $query, 'isOpening' => true, 'closingSetting' => 'setting','allowedDays' => null, 'employee_type' => 'probation', 'year' => $v['year']])->onQueue('processing');
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

     public function probation_first_final_review(Request $request){
        if(!$request->input('key') || !$request->input('c') || ( $request->input('key') != 'Moikzz' || $request->input('c') != 'Ghassan')){
            return json_encode(array("Message" => 'Invalid access', 'Status Code' => 403));
        } 
        
        $currentSetting = PerformanceSetting::where('status' ,'!=', 'locked')->get();  

        if(!$currentSetting || count($currentSetting) == 0){
            return response()->json([
                'message' => 'Kindly add KPI manually / KPI already created.'
            ], 422);
        }

        $defaultDayReminder = Notification::where('meta_key', 'default_reminder_days')->first();  
        $remnderPlusDays = Carbon::now()->addDay($defaultDayReminder->meta_value)->format('Y-m-d');

        foreach($currentSetting AS $k => $v){ 
            $firstReview = Profile::whereHas('teams', function($q) use ($v) { 
                $q->where(['is_regular' => 0, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active'])
                    ->where(['doj' => Carbon::now()->subDays($v['probation_first_review_start'])->format('Y-m-d')]);
            })->whereIn('status', ['active', 'Active'])
            ->with('teams', function($q) use ($v){
                $q->where(['is_regular' => 0, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active'])
                ->where(['doj' => Carbon::now()->subDays($v['probation_first_review_start'])->format('Y-m-d')]);
            })->get();

            // Notification: First Review Open
            if($firstReview && count($firstReview) > 0){
               SendNotification::dispatchAfterResponse(['data' => $firstReview, 'isOpening' => true, 'closingSetting' => 'first_review','allowedDays' => null, 'employee_type' => 'probation', 'year' => $v['year']])->onQueue('processing');
            
               $this->update_review_reminder_date($firstReview, $remnderPlusDays);
            }

            $finalReview = Profile::whereHas('teams', function($q) use ($v) { 
                $q->where(['is_regular' => 0, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active'])
                    ->where(['doj' => Carbon::now()->subDays($v['probation_final_review_start'])->format('Y-m-d')]); 
            })
            ->whereIn('status', ['active', 'Active'])
            ->with('teams', function($q) use ($v){
                $q->where(['is_regular' => 0, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active'])
                ->where(['doj' => Carbon::now()->subDays($v['probation_final_review_start'])->format('Y-m-d')]);
            })->get();
              
             // Notification: Final Review Open
            if($finalReview && count($finalReview) > 0){
                SendNotification::dispatchAfterResponse(['data' => $finalReview, 'isOpening' => true, 'closingSetting' => 'final_review','allowedDays' => null, 'employee_type' => 'probation', 'year' => $v['year']])->onQueue('processing');
                $this->update_review_reminder_date($finalReview, $remnderPlusDays);
            }
           
            $closingReviews = Profile::whereHas('reviews')->where(function($q) use ($v){ 
                            $q->where(['doj' => Carbon::now()->subDays($v['probation_first_review_end'])->format('Y-m-d')])
                            ->orWhere(['doj' => Carbon::now()->subDays($v['probation_final_review_end'])->format('Y-m-d')]); 
                        })->where(['is_regular' => 0, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active'])
                        ->get();
            
            if($closingReviews && count($closingReviews) > 0){
               foreach($closingReviews AS $kz => $vb) {
                    $vb->reviews()->update(['status' =>'closed', 'closing_date' => null, 'reminder_date' => null]);
               } 
            }      
        } 
       
        return json_encode(array("Message" => 'Invalid access', 'Status Code' => 401));
     }

    private function update_review_reminder_date($query, $remnderPlusDays){
        foreach($query AS $k => $v){ 
            foreach($v->teams AS $kk => $vv){
                $q = Review::where('id', $vv->reviews[0]->id)->first();
                $q->update(['reminder_date' => $remnderPlusDays]); 
            }  
        } 
    }

    /**
     *  Based on Model Review, field reminder_date eq current date
     *  Reminder to managers
     *  Run daily
     *  Probation & Regular Employees
     *  Manager without a probation team member will not receive the notification.
     *  See API Route for the URL
     */

    public function daily_reminder_to_managers(Request $request){
        if(!$request->input('key') || !$request->input('c') || ( $request->input('key') != 'Moikzz' || $request->input('c') != 'Ghassan')){
            return json_encode(array("Message" => 'Invalid access', 'Status Code' => 403));
        } 
  
        $reminderEvery   = Carbon::now()->format('Y-m-d');
        $defaultDayReminder = Notification::where('meta_key', 'default_reminder_days')->first();  
        $remnderPlusDays = Carbon::now()->addDay($defaultDayReminder->meta_value)->format('Y-m-d');

        $query = Profile::whereHas('teams', function($q) use ($reminderEvery) {
            $q->whereHas('reviews', function($qq) use ($reminderEvery){
                $qq->where(['reminder_date' => $reminderEvery]);
            })->whereIn('status', ['active', 'Active']);
        })
        ->with(['teams' => function($q) use ($reminderEvery) { 
            $q->whereHas('reviews', function($qq) use ($reminderEvery){
                $qq->where(['reminder_date' => $reminderEvery]);
            })->whereIn('status', ['active', 'Active'])->with('reviews');
        }])->get();
        $currentYear = date('Y');
        if($query && count($query) > 0){
            $state = array();
            $status= array();
            $regular = array();
            foreach($query AS $k => $v){
                $state = array();
                $status= array();
                $regular = array();
                foreach($v->teams AS $kk => $vv){
                    $q = Review::where('id', $vv->reviews[0]->id)->first();
                    //$q->update(['reminder_date' => $remnderPlusDays]);

                    if(!in_array($q->state, $state)){
                        array_push($state, $q->state); 
                        array_push($status, $q->status);
                        array_push($regular, $q->type);
                    }
                }  
            }
            if(count($state) > 0){
                foreach($state AS $kz => $vz){ 
                   SendNotification::dispatchAfterResponse(['data' => $query,'daily_run' => true, 
                   'isOpening' => true, 'closingSetting' => $vz, 'year' => $currentYear, 'employee_type' => $regular[$kz], 'status' => $status[$kz]])->onQueue('processing');
                }
            }
        }

        // $query = Profile::whereHas('reviews', function($qq) use ($reminderEvery){
        //         $qq->where(['reminder_date' => $reminderEvery]); 
        // })
        // ->with(['teams' => function($q) use ($reminderEvery) {
        //     $q->whereHas('reviews', function($qq) use ($reminderEvery){
        //         $qq->where(['reminder_date' => $reminderEvery]);
        //     })->whereIn('status', ['active', 'Active'])->with('reviews');
        // }])->get();
    }

     /**
     *  Final Notification for Probation before the final review date
     *  Reminder to managers
     *  Run daily
     *  Probation Employees
     *  Manager without a probation team member will not receive the notification.
     *  See API Route for the URL
     */

     public function daily_reminder_probation_final_notification(Request $request){
        if(!$request->input('key') || !$request->input('c') || ( $request->input('key') != 'Moikzz' || $request->input('c') != 'Ghassan')){
            return json_encode(array("Message" => 'Invalid access', 'Status Code' => 403));
        }
        $current_month_day = date('Y-m-d');
        $currentYear = date('Y');
        
        $currentSetting = PerformanceSetting::where('status' ,'!=', 'locked')->get();

        if(!$currentSetting || count($currentSetting) == 0){
            return response()->json([
                'message' => 'Kindly add KPI manually / KPI already created.'
            ], 422);
        }
        
        foreach($currentSetting AS $k => $v){  
            $sub_days = (int)$v['probation_final_review_start'];
            $sub_days = $sub_days + 1;
           
            $finalReview = Profile::whereHas('teams', function($q) use ($v, $sub_days) { 
                $q->whereHas('reviews', function($qq) {
                    $qq->where(['state' => 'final_review', 'status' => 'open']);
                })->where(['is_regular' => 0, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active'])
                    ->where(['doj' => Carbon::now()->subDays($sub_days)->format('Y-m-d')]); 
            })
            ->whereIn('status', ['active', 'Active'])
            ->with('teams', function($q) use ($v, $sub_days){
                $q->where(['is_regular' => 0, 'company_id' => $v['company_id']])->whereIn('status', ['active', 'Active'])
                ->where(['doj' => Carbon::now()->subDays($sub_days)->format('Y-m-d')]);
            })->get();
             
            // Notification: Final Review Open 
            if($finalReview && count($finalReview) > 0){  
                SendNotification::dispatchAfterResponse(['data' => $finalReview,'daily_run' => true, 'status' => 'final_notification', 'isOpening' => true, 'closingSetting' => 'final_review','allowedDays' => null, 'employee_type' => 'probation', 'year' => $currentYear])->onQueue('processing');
              
               foreach($finalReview AS $kz => $vb) {
                    foreach($vb->teams AS $d => $zd){
                        $zd->reviews()->update(['closing_date' => null, 'reminder_date' => null]);
                    }
                }
            }

            // Automatic Locked the Year-End after 7 days of it's due
            if($current_month_day ==  date('Y-m-d', strtotime($v['end_year_review_end'] . ' +7 day'))){
                $setting = PerformanceSetting::where('id', $v->id)->first();
                if($setting){
                    $setting->update(['status' => 'locked']);
                }
            }
        }
        return json_encode(array("Message" => 'Invalid access', 'Status Code' => 401));
    }
}