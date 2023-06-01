<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\Profile;
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
    
}