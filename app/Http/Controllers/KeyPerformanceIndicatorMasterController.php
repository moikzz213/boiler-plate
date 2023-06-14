<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\KeyPerformanceIndicatorMaster;

class KeyPerformanceIndicatorMasterController extends Controller
{
    public function getPaginatedKpis()
    {
        $kpis = KeyPerformanceIndicatorMaster::with('industry')->paginate(10);
        return response()->json($kpis, 200);
    }

    public function getPaginatedKpiByType($type)
    {
        $kpis = KeyPerformanceIndicatorMaster::where('type', $type)
        ->whereIn('status', array('pending', 'approved'))
        ->with('industry')->paginate(10);
        return response()->json($kpis, 200);
    }

    public function getNoNPaginatedKpis()
    {
        $kpis = KeyPerformanceIndicatorMaster::where('status','approved')->orderBy('title','ASC')->get();
        return response()->json($kpis, 200);
    }

    public function getNoNPaginatedCustomKpis($ecode)
    {
        $kpis = KeyPerformanceIndicatorMaster::where(['profile_ecode' => $ecode, 'status' => 'pending'])->orderBy('title','ASC')->get();
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
            $kpi = KeyPerformanceIndicatorMaster::where('id', $id)->update([
                'status' => 'trashed'
            ]);
            // $kpi->delete();
        }
        return response()->json([
            'message' => 'KPI removed successfully'
        ], 200);
    }

    public function getCustomKpiByEcode($type, $ecode)
    {
        $kpis = KeyPerformanceIndicatorMaster::where('profile_ecode', $ecode)
        ->where('type', $type)
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
            'subordinate_measures' => $request['subordinate_measures'],
            'calculation_example' => $request['calculation_example'],
            'profile_ecode' => $request['profile_ecode'],
            'industry_id' => $request['industry_id'],
        );
        if($request['id']){
            $kpis = KeyPerformanceIndicatorMaster::where('id', $request['id'])->update($kpiArray);
        }else{
            $kpis = KeyPerformanceIndicatorMaster::create($kpiArray);
        }
        return response()->json([
            'message' => 'Custom KPI saved successfully'
        ], 200);
    }

    public function removeCustomKpi($id)
    {
        $kpi = KeyPerformanceIndicatorMaster::where('id', $id)->first();
        if($kpi){
            $kpi->delete();
        }
        return response()->json([
            'message' => 'Custom KPI removed successfully'
        ], 200);
    }

    public function getKpiByStatus($status)
    {
        $kpis = KeyPerformanceIndicatorMaster::where('status', $status)
        ->with('industry','profile')
        ->paginate(10);
        return response()->json($kpis, 200);
    }

    public function approveCustomKpi(Request $request)
    {
        $kpis = KeyPerformanceIndicatorMaster::where('id', $request['id'])
        ->update([
            'status' => 'approved',
        ]);
        return response()->json([
            'message' => 'Custom KPI approved successfully'
        ], 200);
    }

    public function importKpi(Request $request){
        $resMsg = "";
        $resCode = 200;
        $dataArray = array();
        $itemsToImport = json_decode($request['import_data']);
        $importCount = 0;

        DB::beginTransaction();
        try {
            $import = new KeyPerformanceIndicatorMaster;
            foreach (array_chunk($itemsToImport, 1000) as $itemsToImport_chunked){
                foreach ($itemsToImport_chunked as $item) {
                    $check = KeyPerformanceIndicatorMaster::where('title', $item->title)
                    ->where('industry_id', $request['industry_id'])
                    ->first();

                    if(!$check){
                        array_push($dataArray, array(
                            'title' => $item->title,
                            'status' => 'approved',
                            'definition' => $item->definition,
                            'formula' => $item->formula,
                            'calculation_example' => isset($item->calculation_example) ? $item->calculation_example : null,
                            'subordinate_measures' => $item->subordinate_measures,
                            'type' => 'kpi',
                            'industry_id' => $request['industry_id'],
                        ));
                        $importCount++;
                    }
                }
                $import = $import->insert($dataArray);
            }
            $resMsg = 'KPI imported successfully ('.$importCount.')';
            $resCode = $import ? 200 : 422;
            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            $resCode = 422;
            $resMsg = "Import error please check the csv file";
        }

        return response()->json([
            'message' => $resMsg
        ], $resCode);
    }

    public function importEcd(Request $request) {
        $resMsg = "";
        $resCode = 200;
        $dataArray = array();
        $itemsToImport = json_decode($request['import_data']);
        $importCount = 0;

        DB::beginTransaction();
        try {
            $import = new KeyPerformanceIndicatorMaster;
            foreach (array_chunk($itemsToImport, 1000) as $itemsToImport_chunked){
                foreach ($itemsToImport_chunked as $item) {
                    $check = KeyPerformanceIndicatorMaster::where('title', $item->title)
                    ->where('ecd_type', $item->ecd_type)
                    ->first();

                    if(!$check){
                        array_push($dataArray, array(
                            'title' => $item->title,
                            'status' => 'approved',
                            'type' => 'ecd',
                            'ecd_type' => isset($item->ecd_type) ? $item->ecd_type : null,
                        ));
                        $importCount++;
                    }
                }
                $import = $import->insert($dataArray);
            }
            $resMsg = 'ECD imported successfully ('.$importCount.')';
            $resCode = $import ? 200 : 422;
            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            $resCode = 422;
            $resMsg = "Import error please check the csv file";
        }

        return response()->json([
            'message' => $resMsg
        ], $resCode);
    }

    public function saveMasterKpi(Request $request){
        $kpiArray = array(
            'title' => $request['title'],
            'type' => $request['type'],
            'ecd_type' => isset($request['ecd_type']) ? $request['ecd_type'] : null,
            'status' => 'approved',
            'definition' => $request['definition'],
            'formula' => $request['formula'],
            'subordinate_measures' => $request['subordinate_measures'],
            'calculation_example' => $request['calculation_example'],
            'industry_id' => $request['industry_id'],
        );
        if($request['id']){
            $kpis = KeyPerformanceIndicatorMaster::where('id', $request['id'])->update($kpiArray);
        }else{
            $kpis = KeyPerformanceIndicatorMaster::create($kpiArray);
        }
        return response()->json([
            'message' => 'KPI saved successfully'
        ], 200);
    }
}
