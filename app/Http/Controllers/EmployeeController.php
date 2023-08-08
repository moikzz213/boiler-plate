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
        ])->where('grade', '>=', 6)
        ->with('company', 'managed_by')->with('reviews', function($q) {
            $q->where('year', Carbon::now()->format('Y'))
            ->orderBy('status', 'desc')->with('keyReview');
        })->orderBy('status','asc')->orderBy('role','asc')
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
