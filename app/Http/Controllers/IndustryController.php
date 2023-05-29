<?php

namespace App\Http\Controllers;

use App\Models\Industry;
use Illuminate\Http\Request;

class IndustryController extends Controller
{
    public function getPaginatedIndustries()
    {
        $industries = Industry::paginate(20);
        return response()->json($industries, 200);
    }

    public function getNonPaginatedIndustries()
    {
        $industries = Industry::get();
        return response()->json($industries, 200);
    }

    public function saveIndustry(Request $request)
    {
        if($request['id']){
            $industry = Industry::where('id', $request['id'])->update([
                'title' => $request['title']
            ]);
        }else{
            $industry = Industry::create([
                'title' => $request['title']
            ]);
        }

        return response()->json([
            'message' => 'Industry saved successfully'
        ], 200);
    }

    public function removeIndustry($id)
    {
        $industry = Industry::where('id', $id)->first();
        if($industry){
            $industry->delete();
        }
        return response()->json([
            'message' => 'Industry removed successfully'
        ], 200);
    }
}
