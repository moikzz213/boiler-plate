<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class EmployeeController extends Controller
{
    public function getEmployees($ecode)
    {
        $auth = Profile::where('ecode',$ecode)->first();
        // $profile = new Profile;
        // $employees = null;
        // if($auth->role == 'hrbp'){
        //     $employees = Profile::where('hrbp_email',$auth->email)->paginate(10);
        // }elseif ($auth->role == 'hr_admin'){
        //     $employees = Profile::paginate(20);
        // }

        $employees = QueryBuilder::for(Profile::class)
        ->allowedFilters([
            'is_regular',
            'company_id',
            AllowedFilter::callback('employee', function ($query, $value) {
                $query->where('first_name', 'like', '%' . $value . '%')
                    ->orWhere('last_name', 'like', '%' . $value . '%')
                    ->orWhere('ecode', 'like', '%' . $value . '%');
            })
        ])
        ->where('hrbp_email', $auth->email)
        ->paginate(10)
        ->appends(request()->query());

        return response()->json($employees, 200);
    }
}
