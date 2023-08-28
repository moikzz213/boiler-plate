<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Profile;
use Illuminate\Http\Request;
use App\Helper\GlobalFunction;
use Illuminate\Support\Carbon;
use App\Models\PerformanceSetting;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class EmployeeController extends Controller
{
    public function getEmployees()
    {
        $employees = QueryBuilder::for(Profile::class)
        ->allowedFilters([
            'is_regular',
            AllowedFilter::callback('company_id', function ($query, $value) {
                $query->where('company_id', $value);
            })->ignore('null'),
            AllowedFilter::callback('employee', function ($query, $value) {
                $query->where('first_name', 'like', '%' . $value . '%')
                ->orWhere('last_name', 'like', '%' . $value . '%')
                ->orWhere('display_name', 'like', '%' . $value . '%')
                ->orWhere('email', 'like', '%' . $value . '%')
                ->orWhere('ecode', 'like', '%' . $value . '%');
            })->ignore('null'),
            AllowedFilter::callback('hrbp_email', function ($query, $value) {
                $auth = Profile::where('email', $value)->first();
                if ($auth->role == 'hrbp'){
                    $query->where('hrbp_email', $value);
                }
            }),
        ])->whereBetween('grade', [6,10])
        ->with('company', 'managed_by')->with('reviews', function($q) {
            $q->where('year', Carbon::now()->format('Y'))
            ->orderBy('status', 'desc')->with('keyReview');
        })->orderBy('status','asc')->orderBy('display_name','asc')
        ->paginate(10)
        ->appends(request()->query());

        return response()->json($employees, 200);
    }

    function getEmployeeByEcode($ecode)
    {
        $employee = Profile::class::where('ecode', $ecode)
        ->with('reviews', function($q) {
            $q->where('year', Carbon::now()->format('Y'))->with('keyReview');
        })->with('company','managed_by') 
        ->first();
        return response()->json($employee, 200);
    }

    function searchEmployee()
    {
        $employees = QueryBuilder::for(Profile::class)
        ->allowedFilters([
            AllowedFilter::callback('search', function ($query, $value) {
                $query->where('first_name', 'like', '%' . $value . '%')
                ->orWhere('last_name', 'like', '%' . $value . '%')
                ->orWhere('display_name', 'like', '%' . $value . '%')
                ->orWhere('email', 'like', '%' . $value . '%')
                ->orWhere('ecode', 'like', '%' . $value . '%');
            }),
        ])
        ->with('reviews', function($q) {
            $q->where('year', Carbon::now()->format('Y'))->with('keyReview');
        })->with('company','managed_by')->get();
        return response()->json($employees, 200);
    }

    function hrChangeStateEmployee(Request $request){
        $review = Review::class::where('id', $request['reviewID'])->first(); 

        $update = $review->update(array('state' => $request['state'], 'status' => 'open', 'reminder_date' =>  Carbon::now()->addDay())); 
        $review->logs()->create([
            'profile_id' => $request['profile_id'],
            'details' => $review,
            'log_type' => 'update-review-state'
        ]);

        return response()->json([
            'message' => 'Employee KPI Review state has been changed to '.$request['title']
        ], 200);
    }

    public function check_count_reviews_mid_year(Request $request){
        $auth = $request['auth'];
        $hrbp = $request['hrbp'];

        if($auth == 'hr_admin' || $auth == 'app_admin'){ 
            $first = Review::class::where(['state' => 'setting', 'status' => 'submitted'])->first();
            $second = Review::class::where(['status' => 'submitted'])->where(function($q){
                $q->where(['state' => 'midyear'])->orWhere(['state' => 'first_review']);
            })->first();
        }else{
            $first = Profile::class::where(['hrbp_email' => $hrbp])->whereHas('reviews', function($q) {
                $q->where(['state' => 'setting', 'status' => 'submitted']);
            })->with('reviews', function($q) {
                $q->where(['state' => 'setting', 'status' => 'submitted']);
            })->first(); 
            
            $second = Profile::class::where(['hrbp_email' => $hrbp])->whereHas('reviews', function($q) {
                $q->where(['status' => 'submitted'])->where(function($qq){
                    $qq->where(['state' => 'midyear'])->orWhere(['state' => 'first_review']);
                });
            })->with('reviews', function($q) {
                $q->where(['status' => 'submitted'])->where(function($qq){
                    $qq->where(['state' => 'midyear'])->orWhere(['state' => 'first_review']);
                });
            })->first();  
            
        }
        return response()->json([
            'first_button' => $first,
            'second_button' => $second
        ], 200);
    }

    private function StateChangeQuery($newState,$oldState, $type ){
        $review = Review::class::where(['state' => $oldState, 'status' => 'submitted', 'type' => $type])->update(array('state' => $newState, 'status' => 'open', 'reminder_date' =>  Carbon::now()->addDay(1)));
        return $review;
    }

    private function HRBPStateChangeQuery($newState, $reviewIDs ){
     
        Review::class::whereIn('id',$reviewIDs )
                ->update(array('state' => $newState, 'status' => 'open', 'reminder_date' =>  Carbon::now()->addDay(1)));
    }

    private function HRBPQueryState($hrbp, $state, $type){
        $employees = Profile::class::where(['hrbp_email' => $hrbp])->whereHas('reviews', function($q) use($type, $state){
            $q->where(['state' => $state, 'status' => 'submitted', 'type' => $type]);
        })->with('reviews', function($q) use($type, $state){
            $q->where(['state' => $state, 'status' => 'submitted', 'type' => $type]);
        })->get();
       
        return $employees;
    }

    function hrChangeMultipleStateEmployee(Request $request){
       $auth = $request['auth'];
       $hrbp = $request['hrbp'];
        $review = array();
        if($request['state'] == 'midyear' ){
            
            if($auth == 'hr_admin' || $auth == 'app_admin'){ 
                $review = $this->StateChangeQuery('midyear','setting','regular');
                $this->StateChangeQuery('first_review','setting','probation'); 
            }else{
                
                $employees = $this->HRBPQueryState($hrbp, 'setting', 'regular'); 
                 
                $reviewIDs = array();  
                foreach ($employees as $key => $value) { 
                    $reviewIDs[] = $value->reviews[0]->id; 
                } 
               
                $this->HRBPStateChangeQuery('midyear', $reviewIDs);

                $employees2 = $this->HRBPQueryState($hrbp, 'setting', 'probation');
               
                $reviewIDs2 = array();
                foreach ($employees2 as $key => $value) { 
                    $reviewIDs2[] = $value->reviews[0]->id; 
                } 
               
                $this->HRBPStateChangeQuery('first_review', $reviewIDs2); 
               
            }
        }else{
            if($auth == 'hr_admin' || $auth == 'app_admin'){  
                $this->StateChangeQuery('yearend','midyear','regular');
                $this->StateChangeQuery('final_review','midyear','probation');

            }else{
                $employees = $this->HRBPQueryState($hrbp, 'midyear', 'regular'); 
                 
                $reviewIDs = array();
                foreach ($employees as $key => $value) { 
                    $reviewIDs[] = $value->reviews[0]->id; 
                } 
               
                $this->HRBPStateChangeQuery('yearend', $reviewIDs);

                $employees2 = $this->HRBPQueryState($hrbp, 'first_review', 'probation');
               
                $reviewIDs2 = array();
                foreach ($employees2 as $key => $value) { 
                    $reviewIDs2[] = $value->reviews[0]->id; 
                } 
               
                $this->HRBPStateChangeQuery('final_review', $reviewIDs2); 
            }
        } 

        return response()->json([
            'message' => 'Employee KPI Review has been changed'
        ], 200);
    }

    function secondaryManager(Request $request){
        $employee = Profile::class::where('ecode', $request['ecode'])->first(); 

        $update = $employee->update(array('slave_ecode' => $request['slave_ecode'])); 
        $employee->logs()->create([
            'profile_id' => $request['profile_id'],
            'details' => $employee,
            'log_type' => 'update-secondary-manager'
        ]);

        return response()->json([
            'message' => 'Employee secondary manager updated!'
        ], 200);
    }

    function updateEmployeeStatus(Request $request)
    {
        $employee = Profile::class::where('ecode', $request['ecode'])->first();
        if($request['status'] == 'Active'){
            $updateData = array('status' => $request['status'], 'sync' => 1);
        }else{
            $updateData = array('status' => $request['status'], 'sync' => 0);
        }

        $update = $employee->update($updateData);

        $employee->logs()->create([
            'profile_id' => $request['profile_id'],
            'details' => $employee,
            'log_type' => 'update'
        ]);

        $passData = array('ecode' => $request['ecode'], 'status' => $request['status']);
        $this->pushToUMS($passData);

        return response()->json([
            'message' => 'Employee status changed to '. $request['status']
        ], 200);
    }

    private function pushToUMS($data){
        
        $formData = json_encode(array('query' => $data));
        $url = env('VITE_SANCTUM_USER_URL').'/api/pms-application/update';
        $loginpassw = "user_integration@gagroup.local:Abcd@123"; 
        $globalFunction = new GlobalFunction();
        $stringReponse = $globalFunction->runCurl($url, $data, $loginpassw);

        return $stringReponse;
    }

    function reopenEmployeeReview(Request $request)
    {
        $profile = Profile::class::where('ecode', $request['ecode'])->first();

        $reviewID = Review::where(['profile_id' => $profile->id, 'year' => $request['year']])->first();
       
        if($reviewID && $reviewID->id){
            $updateReview = $profile->reviews()
            ->where('year', Carbon::now()->format('Y'))
            ->update(['status' => 'open',
            'closing_date'              => Carbon::now()->addDay(3),
            'reminder_date'             => Carbon::now()->addDay(1)]); 

            $reviewID->logs()->create([
                'profile_id' => $request['profile_id'],
                'details' => $reviewID,
                'log_type' => 'admin-reopen'
            ]);
        }else{
           
            $settings = PerformanceSetting::where(['company_id' => $profile->company_id, 'year' => Carbon::now()->format('Y')])->first();

            $data = array(
                'performance_settings_id'   => $settings->id,
                'company_id'                => $profile->company_id,
                'state'                     => 'setting',
                'status'                    => 'open',
                'year'                      => Carbon::now()->format('Y'),
                'type'                      => $profile->is_regular ? 'regular' : 'probation',
                'closing_date'              => Carbon::now()->addDay(3),
                'reminder_date'             => Carbon::now()->addDay(1),
                'author'                    => $request['name']
            );

            $profile->reviews()->create($data); 

            $profile->logs()->create([
                'profile_id' => $request['profile_id'],
                'details' => json_encode($data),
                'log_type' => 'admin-open'
            ]);
        } 

        return response()->json([
            'message' => 'KPI Status updated successfully'
        ], 200);
    }
}
