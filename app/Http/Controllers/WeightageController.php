<?php

namespace App\Http\Controllers;

use App\Models\Weightage;
use Illuminate\Http\Request;

class WeightageController extends Controller
{
    public function getPaginatedWeightages()
    {
        $weightages = Weightage::paginate(10);
        return response()->json($weightages, 200);
    }

    public function saveWeightage(Request $request)
    {
        if($request['id']){
            $weightage = Weightage::where('id', $request['id'])->update([
                'title' => $request['title']
            ]);
        }else{
            $weightage = Weightage::create([
                'title' => $request['title']
            ]);
        }

        return response()->json([
            'message' => 'Weightage saved successfully'
        ], 200);
    }

    public function removeWeightage($id)
    {
        $weightage = Weightage::where('id', $id)->first();
        if($weightage){
            $weightage->delete();
        }
        return response()->json([
            'message' => 'Weightage removed successfully'
        ], 200);
    }
}
