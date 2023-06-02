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

    public function getCustomKpiByEcode($ecode)
    {
        $kpis = KeyPerformanceIndicatorMaster::where('profile_ecode', $ecode)
        ->with('profile', 'industry')
        ->paginate(10);
        return response()->json($kpis, 200);
    }

    public function saveCustomKpiWithProfileEcode(Request $request)
    {
        $kpiArray = array(
            'title' => $request['title'],
            'definition' => $request['definition'],
            'formula' => $request['formula'],
            'measures' => $request['measures'],
            'calculation_example' => $request['calculation_example'],
            'evaluation_pattern' => $request['evaluation_pattern'],
            'profile_ecode' => $request['profile_ecode'],
            'industry_id' => $request['industry_id'],
        );
        $kpis = KeyPerformanceIndicatorMaster::create($kpiArray);
        return response()->json([
            'message' => 'Custom KPI saved successfully'
        ], 200);
    }
}
