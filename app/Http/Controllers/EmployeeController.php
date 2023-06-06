<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class EmployeeController extends Controller
{
    public function getEmployees()
    {
        $employees = QueryBuilder::for(Profile::class)
        ->allowedFilters([
            'is_regular',
            'company_id',
            AllowedFilter::callback('employee', function ($query, $value) {
                $query->where('first_name', 'like', '%' . $value . '%')
                ->orWhere('last_name', 'like', '%' . $value . '%')
                ->orWhere('ecode', 'like', '%' . $value . '%');
            }),
            AllowedFilter::exact('hrbp_email'),
        ])
        ->paginate(10)
        ->appends(request()->query());

        return response()->json($employees, 200);
    }
}
