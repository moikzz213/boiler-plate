<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class ProfileController extends Controller
{
    public function saveProfile(Request $request)
    {
        $profileArray = array(
            'full_name' => $request['full_name'],
            'dob' => $request['dob'],
            'nationality' => $request['nationality'],
        );
        $profile = Profile::updateOrCreate([
            'user_id' => $request['id'],

        ], $profileArray);
        return response()->json([
            'message' => 'Profile saved successfully',
            'profile' => $profile
        ], 200);
    }

    public function getProfileById($id)
    {
        $profile = Profile::where('user_id', $id)->first();
        return response()->json($profile, 200);
    }

    public function EmployeeKPI($ecode, $year){

        $query = Profile::where(
            'ecode', $ecode
        )->with('reviews.keyReview','company')->with('reviews', function($q) use ($year){
            $q->where('year', $year);
        })->first();

        return response()->json([
            'result' => $query
        ], 200);
    }

    public function KPIEmployeeByYear($ecode, $year){

        $query = Profile::whereHas('reviews', function($q) use ($year){
            $q->where('year', $year);
        })->where(
            'ecode', $ecode
        )->first();

        return response()->json([
            'result' => $query
        ], 200);
    }

    public function fetchAuthProfile($ecode){
        $profile = Profile::where('ecode', $ecode )->with('teams.reviews.keyReview','teams.company', 'reviews.keyReview','company')
        ->with('reviews',function ($q) {
            $q->where('year', Carbon::now()->format('Y'));
        })->first();

        return response()->json([
            'result' => $profile
        ], 200);
    }

    public function createReviewByYear(Request $request){

        $query = Profile::where('ecode', $request->ecode )->first();
        $query->reviews()->create([
            'performance_settings_id' => $request->setting['id'],
            'state'         => 'setting',
            'status'        => 'inprogress',
            'company_id'        =>  $request->setting['company_id'],
            'year'          => $request->year,
            'type'          => $request->is_regular ? "regular" : "probation",
            'author'        => $request->author
        ]);

        return response()->json([
            'message' => 'KPI has been created'
        ], 200);
    }

    public function getSingleUser($ecode)
    {
        $profile = Profile::where('ecode', $ecode)->with('company','managed_by')->first();
        return response()->json($profile, 200);
    }

    public function getUsers()
    {
        $profiles = QueryBuilder::for(Profile::class)
        ->allowedFilters([
            AllowedFilter::callback('employee', function ($query, $value) {
                if($value !== null) {
                    $query->where('first_name', 'like', '%' . $value . '%')
                    ->orWhere('last_name', 'like', '%' . $value . '%')
                    ->orWhere('display_name', 'like', '%' . $value . '%')
                    ->orWhere('email', 'like', '%' . $value . '%')
                    ->orWhere('role', 'like', '%' . $value . '%')
                    ->orWhere('status', 'like', '%' . $value . '%')
                    ->orWhere('ecode', 'like', '%' . $value . '%');
                }
            })->ignore('null')
        ])
        ->paginate(10)
        ->appends(request()->query());

        // $rolesArray = array('hrbp', 'hr_admin');
        // $profiles = Profile::whereIn('role', $rolesArray)->paginate(10);
        // $profiles = Profile::orderBy('role', 'ASC')->paginate(10);
        return response()->json($profiles, 200);
    }

}
