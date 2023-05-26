<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;

class ReviewController extends Controller
{
    public function KeyPerformance($year){
         
        $query = Review::where([
            'year' => $year
        ])->with('keyReview')->first(); 

        return response()->json([
            'result' => $query
        ], 200);
    }
}