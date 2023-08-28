<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\PerformanceSetting;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class ReportController extends Controller
{
    public function getEmployees(Request $request)
    {
      
        $employees = QueryBuilder::for(Profile::class)
        ->allowedFilters([
            'is_regular', 
            AllowedFilter::callback('hrbp_email', function ($query, $value) {
                $auth = Profile::where('email', $value)->first(); 
                if ($auth->role == 'hrbp'){
                    $query->where('hrbp_email', $value);
                }
            }),
        ])->whereIn('status', ['active', 'Active'])->whereBetween('grade', [6,10])
        ->with('company','managed_by')->with('reviews', function($q) use ($request) { 
            $q->where('year', $request->year);
        })->orderBy('superior_ecode', 'ASC')->orderBy('status','asc')->orderBy('role','asc')
        ->get();

        return response()->json($employees, 200);
    }
}
