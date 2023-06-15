<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Company;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\PerformanceSetting;
use App\Models\KeyPerformanceReview;

class ReviewController extends Controller
{
    public function KeyPerformance($id, $year){

        $query = Review::where([
            'profile_id' => $id,
            'year' => $year
        ])->with('keyReview')->first();

        return response()->json([
            'result' => $query
        ], 200);
    }

    public function kpiSubmitted(Request $request){

        $query = Review::where('id', $request->reviewID)->first();
        $query->update(['status' => $request->newStatus]);
        if($request->newStatus !== 'submitted'){
            $msg = 'KPI status changed to '.$request->newStatus;
        }else{
            $msg = 'KPI for this employee is now complete.';
        }

        $profile = Profile::where('ecode', $request['user_ecode'])
        ->with(
            'teams.reviews.keyReview',
            'teams.company',
            'reviews.keyReview',
            'company')
        ->with('reviews',function ($q) {
            $q->where('year', Carbon::now()->format('Y'));
        })->first();

        return response()->json([
            'message' => $msg,
            'profile' => $profile
        ], 200);
    }

    public function createEmployeeKPI(Request $request){
        $msg = 'KPI has been updated';

        $weightage = explode('%', $request->data['data']['weightage']);
        if($request->data['action'] == 'add'){
            $query = Review::where('id', $request->reviewID)->first();
            $query->update(['status' => 'inprogress']);
            $query->keyReview()->create([
                'title'                 => $request->data['data']['title'],
                'industry'              => @$request->data['industryTitle'],
                'definition'            => @$request->data['data']['definition'],
                'formula'               => @$request->data['data']['formula'],
                'measures'              => @$request->data['data']['measures'],
                'calculation_example'   => @$request->data['data']['calculation_example'],
                'evaluation_pattern'    => @$request->data['data']['evaluation_pattern'],
                'type'                  => $request->data['data']['type'],
                'ecd_type'              => @$request->data['data']['ecd_type'],
                'target_type'           => @$request->data['data']['target_type'],
                'target'                => @$request->data['data']['target'],
                'subordinate_measures'  => @$request->data['data']['subordinate_measures'],
                'weightage'             => @$weightage[0] ? $weightage[0] : 0
            ]);

            $msg = 'KPI has been created';
        }else{
            $query = KeyPerformanceReview::where('id', $request->data['data']['id'])->first();
            $query->update([
                'measures'              => @$request->data['data']['measures'],
                'target_type'           => @$request->data['data']['target_type'],
                'target'                => @$request->data['data']['target'],
                'weightage'             => @$weightage[0] ? $weightage[0] : 0
            ]);
            $msg = 'KPI has been updated';
        }


        $profile = Profile::where('ecode', $request['user_ecode'])
        ->with(
            'teams.reviews.keyReview',
            'teams.company',
            'reviews.keyReview',
            'company')
        ->with('reviews',function ($q) {
            $q->where('year', Carbon::now()->format('Y'));
        })->first();

        return response()->json([
            'message' => $msg,
            'profile' => $profile
        ], 200);
    }

    function getReviewForGraph(){
        $review = new PerformanceSetting;
        $reviews = $review->where('year', Carbon::now()->format('Y'))
        ->get();

        // graph array
        $company = new Company;
        $stateArray = array('setting', 'midyear', 'yearend');
        $data = $company
        ->whereHas('profiles')
        ->whereHas('settings', function ($q) use($stateArray) {
            $q->where('year', Carbon::now()->format('Y'))
            ->whereIn('state', $stateArray);
        })
        ->withCount([
            'profiles as open' => function ($query) {
                $query->whereHas('reviews', function($query){
                    $query->where('status', 'open');
                })
                ->orDoesntHave('reviews');
            },
            'profiles as in_progress' => function ($query) {
                $query->whereHas('reviews', function($query){
                    $query->where('status', 'inprogress');
                });
            },
            'profiles as in_review' => function ($query) {
                $query->whereHas('reviews', function($query){
                    $query->where('status', 'inreview');
                });
            },
            'profiles as submitted' => function ($query) {
                $query->whereHas('reviews', function($query){
                    $query->where('status', 'submitted');
                });
            },
        ])
        ->get();

        return response()->json([
            'formatted_data' => $this->formatCollectionForGraph($data),
            'data' => $data
        ], 200);
    }

    function formatCollectionForGraph($collection)
    {
        $results = [];
        foreach ($collection as $item) {
            $results[] = [
                'company' => $item->title,
                'data' => array(
                    $item->open,
                    $item->in_progress,
                    $item->in_review,
                    $item->submitted,
                )
            ];
        }

        return collect($results);
    }
}
