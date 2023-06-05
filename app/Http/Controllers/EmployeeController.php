<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function getEmployees($ecode)
    {
        $auth = Profile::where('ecode',$ecode)->first();
        $profile = new Profile;
        $employees = null;
        if($auth->role == 'hrbp'){
            $employees = Profile::where('hrbp_email',$auth->email)->paginate(10);
        }elseif ($auth->role == 'hr_admin'){
            $employees = Profile::paginate(20);
        }
        return response()->json($employees, 200);
    }
}
