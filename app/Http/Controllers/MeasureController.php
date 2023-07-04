<?php

namespace App\Http\Controllers;

use App\Models\Measure;
use Illuminate\Http\Request;

class MeasureController extends Controller
{
    public function getPaginatedMeasures()
    {
        $measures = Measure::paginate(10);
        return response()->json($measures, 200);
    }

    public function getNonPaginatedMeasures()
    {
        $measures = Measure::orderBy('title','asc')->get();
        return response()->json($measures, 200);
    }

    public function saveMeasure(Request $request)
    {
        $logType = '';
        if($request['id']){
            $measure = Measure::where('id', $request['id'])->first();
            $update = $measure->update([
                'title' => $request['title']
            ]);
            $logType = 'update';
        }else{
            $measure = Measure::create([
                'title' => $request['title']
            ]);
            $logType = 'new';
        }
        $measure->logs()->create([
            'profile_id' => $request['profile_id'],
            'details' => $measure,
            'log_type' => $logType
        ]);
        return response()->json([
            'message' => 'Measure saved successfully'
        ], 200);
    }

    public function updateStatusMeasure(Request $request, $id)
    {
        $measure = Measure::where('id', $id)->first();
        if($measure){
            $update = $measure->update([
                'status' => $request['status']
            ]);

            $measure->logs()->create([
                'profile_id' => $request['profile_id'],
                'details' => $measure,
                'log_type' => 'update'
            ]);
        }
        return response()->json([
            'message' => 'Measure removed successfully'
        ], 200);
    }
}
