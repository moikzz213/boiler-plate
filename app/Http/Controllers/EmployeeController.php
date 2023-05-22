<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function getPaginatedEmployees()
    {
        $employees = Profile::paginate(20);
        return response()->json($employees, 200);
    }
}
