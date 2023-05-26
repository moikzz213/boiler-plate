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

    public function saveMeasure(Request $request)
    {
        if($request['id']){
            $measure = Measure::where('id', $request['id'])->update([
                'title' => $request['title']
            ]);
        }else{
            $measure = Measure::create([
                'title' => $request['title']
            ]);
        }

        return response()->json([
            'message' => 'Measure saved successfully'
        ], 200);
    }

    public function removeMeasure($id)
    {
        $measure = Measure::where('id', $id)->first();
        if($measure){
            $measure->delete();
        }
        return response()->json([
            'message' => 'Measure removed successfully'
        ], 200);
    }
}
