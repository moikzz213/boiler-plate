<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Industry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IndustryController extends Controller
{
    public function getIndustries()
    {
        $industries = Industry::orderBy('title', 'ASC')->get();
        return response()->json($industries, 200);
    }

    public function getPaginatedIndustries()
    {
        $industries = Industry::paginate(10);
        return response()->json($industries, 200);
    }

    public function getNonPaginatedIndustries()
    {
        $industries = Industry::orderBy('title', 'ASC')->get();
        return response()->json($industries, 200);
    }

    public function saveIndustry(Request $request)
    {
        $logType = '';
        if($request['id']){
            $industry = Industry::where('id', $request['id'])->first();
            $update = $industry->update([
                'title' => $request['title']
            ]);
            $logType = 'update';
        }else{
            $industry = Industry::create([
                'title' => $request['title']
            ]);
            $logType = 'new';
        }
        $industry->logs()->create([
            'profile_id' => $request['profile_id'],
            'details' => $industry,
            'log_type' => $logType
        ]);
        return response()->json([
            'message' => 'Industry saved successfully',
        ], 200);
    }

    public function removeIndustry(Request $request, $id)
    {
        $industry = Industry::where('id', $id)->first();
        if($industry){
            $update = $industry->update([
                'status' => 'inactive'
            ]);

            $industry->logs()->create([
                'profile_id' => $request['profile_id'],
                'details' => $industry,
                'log_type' => 'update'
            ]);
        }
        return response()->json([
            'message' => 'Industry removed successfully'
        ], 200);
    }

    public function importIndustries(Request $request)
    {
        $resMsg = "";
        $resCode = 200;
        $industryArray = array();
        $itemsToImport = json_decode($request['import_data']);
        $importCount = 0;

        DB::beginTransaction();
        try {
            $import = new Industry;
            foreach (array_chunk($itemsToImport, 1000) as $itemsToImport_chunked){
                foreach ($itemsToImport_chunked as $item) {
                    $check = Industry::where('title', $item->title)->first();
                    if(!$check){
                        array_push($industryArray, array(
                            'title' => $item->title,
                        ));
                        $importCount++;
                    }
                }
                $import = $import->insert($industryArray);
            }
            $resMsg = 'Industries imported successfully ('.$importCount.')';
            $resCode = $import ? 200 : 422;
            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            $resCode = 500;
            $resMsg = "Import failed";
        }

        return response()->json([
            'message' => $resMsg
        ], 200);
    }
}
