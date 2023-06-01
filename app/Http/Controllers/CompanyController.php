<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function getCompanies()
    {
        $companies = Company::all();
        return response()->json($companies, 200);
    }
}
