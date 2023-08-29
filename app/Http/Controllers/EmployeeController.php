<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use App\Helper\GlobalFunction;
use Illuminate\Support\Carbon;
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
        ])
        ->with('company')->orderBy('status','asc')->orderBy('display_name','asc')
        ->paginate(10)
        ->appends(request()->query());

        return response()->json($employees, 200);
    }

    function getEmployeeByEcode($ecode)
    {
        $employee = Profile::class::where('ecode', $ecode)
        ->with('company') 
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
       ->with('company')->get();
        return response()->json($employees, 200);
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
}
