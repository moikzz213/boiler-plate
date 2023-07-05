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
        $logType = '';
        if($request['id']){
            $weightage = Weightage::where('id', $request['id'])->first();
            $update = $weightage->update([
                'title' => $request['title']
            ]);
            $logType = 'update';
        }else{
            $weightage = Weightage::create([
                'title' => $request['title']
            ]);
            $logType = 'new';
        }
        $weightage->logs()->create([
            'profile_id' => $request['profile_id'],
            'details' => $weightage,
            'log_type' => $logType
        ]);
        return response()->json([
            'message' => 'Weightage saved successfully'
        ], 200);
    }

    public function updateStatusWeightage(Request $request, $id)
    {
        $weightage = Weightage::where('id', $id)->first();
        if($weightage){
            $update = $weightage->update([
                'status' => $request['status']
            ]);

            $weightage->logs()->create([
                'profile_id' => $request['profile_id'],
                'details' => $weightage,
                'log_type' => 'update'
            ]);
        }
        return response()->json([
            'message' => 'Weightage status updated successfully'
        ], 200);
    }
}
