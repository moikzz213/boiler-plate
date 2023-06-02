<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

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
            'year'          => $request->year,
            'type'          => $request->is_regular ? "regular" : "probation",
            'author'        => $request->author
        ]);

        return response()->json([
            'message' => 'KPI has been created'
        ], 200);
    } 
    
} 