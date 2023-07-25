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
        ->with('company')->with('reviews', function($q) {
            $q->where('year', Carbon::now()->format('Y'))->with('keyReview');
        })->orderBy('status','asc')->orderBy('role','asc')
        ->get();

        return response()->json($employees, 200);
    }
}
