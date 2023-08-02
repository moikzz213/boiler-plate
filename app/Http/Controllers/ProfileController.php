<?php

namespace App\Http\Controllers;

use App\Models\Review;
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

    public function teamMembers($ecode){
        // First Level
        $team = Profile::where(['superior_ecode' => $ecode, 'status' => 'Active'])
        ->with('reviews', function($q) {
            $q->where('year', Carbon::now()->format('Y'))->with('keyReview');
        })->with('company')->with('teams', function($q) {
            // Second Level
            $q->with('reviews', function($qq) {
                $qq->where('year', Carbon::now()->format('Y'))->with('keyReview');
            })->with('company')->where('grade', '>', 5)->whereIn('status', ['active', 'Active'])->orderBy('is_regular', 'ASC');

            // Third Level
            $q->with('teams', function($qq) {
                $qq->with('reviews', function($qq) {
                    $qq->where('year', Carbon::now()->format('Y'))->with('keyReview');
                })->with('company')->where('grade', '>', 5)->whereIn('status', ['active', 'Active'])->orderBy('is_regular', 'ASC');

                // Fourth Level
                $qq->with('teams', function($qq) {
                    $qq->with('reviews', function($qq) {
                        $qq->where('year', Carbon::now()->format('Y'))->with('keyReview');
                    })->with('company')->where('grade', '>', 5)->whereIn('status', ['active', 'Active'])->orderBy('is_regular', 'ASC');

                    // Fifth Level
                    $qq->with('teams', function($qq) {
                        $qq->with('reviews', function($qq) {
                            $qq->where('year', Carbon::now()->format('Y'))->with('keyReview');
                        })->with('company')->where('grade', '>', 5)->whereIn('status', ['active', 'Active'])->orderBy('is_regular', 'ASC');
                    });
                });
            });
        })->orderBy('is_regular', 'ASC')->get();
        return response()->json($team, 200);
    }

    public function EmployeeKPI($ecode, $year){

        $query = Profile::where(
            'ecode', $ecode
        )->with('company','managed_by', 'reviews.settings')->with('reviews', function($q) use ($year){
            $q->where('year', $year)->with('keyReview');
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
        $profile = Profile::where('ecode', $ecode) 
                ->with( 
                    'teams.company', 
                    'company')
                ->with('reviews', function($q) {
                    $q->where('year', Carbon::now()->format('Y'))->with('keyReview');
                })
                ->with('teams', function($q) {
                    $q->with('reviews', function($qq) {
                        $qq->where('year', Carbon::now()->format('Y'))->with('keyReview');
                    });
                })->first(); 
        return response()->json([
            'result' => $profile
        ], 200);
    }

    public function createReviewByYear(Request $request){

        $query = Profile::where('ecode', $request->ecode )->first();
        $haveReview = Review::where(['profile_id' => $query->id, 'year' => $request->year, 'performance_settings_id' => $request->setting['id']])->first();
      
        if($haveReview){
            $query->reviews()->update([ 
                'status'        => 'inprogress',
                'author'        => $request->author,
                'reminder_date' => Carbon::now()->addDays(3),
            ]);
        }else{
            $query->reviews()->create([
                'performance_settings_id' => $request->setting['id'],
                'state'         => 'setting',
                'status'        => 'inprogress',
                'company_id'    => $request->setting['company_id'],
                'year'          => $request->year,
                'reminder_date' => Carbon::now()->addDays(3), // add reminder date, current date + 3 days
                'type'          => $request->is_regular ? "regular" : "probation",
                'author'        => $request->author
            ]);
        }
        return response()->json([
            'query' => $query,
            'data' => $haveReview,
            'message' => 'KPI Setting / Review has been Initiated.'
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
        ])->orderBy('status','asc')->orderBy('role','asc')
        ->paginate(10)
        ->appends(request()->query());
        return response()->json($profiles, 200);
    }

    public function saveAccount(Request $request)
    { 
        $profile = Profile::where('ecode', $request['ecode'])->first();
        $msg  = 'Account saved successfully';
        if($request['enable']){
            
            if($request['enable'] == 'Active'){
                $msg = 'Account has been Enable';
                $updateData = array('status' => $request['enable'], 'sync' => 1);
            }else{
                $msg = 'Account has been Disabled';
                $updateData = array('status' => $request['enable'], 'sync' => 0);
            }

            $profile->update($updateData);

        }else{
            $profile->update([ 
                'role' => $request['role']
            ]);
        }

        $profile->logs()->create([
            'profile_id' => $request['author'],
            'details' => $profile,
            'log_type' => 'update'
        ]);

        return response()->json([
            'message' => $msg
        ], 200);
    }
}
