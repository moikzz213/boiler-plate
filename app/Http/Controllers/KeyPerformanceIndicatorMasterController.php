<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KeyPerformanceIndicatorMaster;

class KeyPerformanceIndicatorMasterController extends Controller
{
    public function getPaginatedKpis()
    {
        $kpis = KeyPerformanceIndicatorMaster::paginate(10);
        return response()->json($kpis, 200);
    }

    public function getNoNPaginatedKpis()
    {
        $kpis = KeyPerformanceIndicatorMaster::where('status','active')->orderBy('title','ASC')->get();
        return response()->json($kpis, 200);
    }

    public function saveKpi(Request $request)
    {
        if($request['id']){
            $kpi = KeyPerformanceIndicatorMaster::where('id', $request['id'])->update([
                'title' => $request['title']
            ]);
        }else{
            $kpi = KeyPerformanceIndicatorMaster::create([
                'title' => $request['title']
            ]);
        }

        return response()->json([
            'message' => 'KPI saved successfully'
        ], 200);
    }

    public function removeKpi($id)
    {
        $kpi = KeyPerformanceIndicatorMaster::where('id', $id)->first();
        if($kpi){
            $kpi->delete();
        }
        return response()->json([
            'message' => 'KPI removed successfully'
        ], 200);
    }
}
