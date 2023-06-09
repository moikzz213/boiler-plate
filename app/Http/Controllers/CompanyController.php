<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller
{
    public function getCompanyList()
    {
        $companies = Company::orderBy('title', 'ASC')->all();
        return response()->json($companies, 200);
    }

    public function getCompanies()
    {
        $companies = Company::orderBy('title', 'ASC')->paginate(10);
        return response()->json($companies, 200);
    }

    public function saveCompany(Request $request)
    {
        if($request['id']){
            $company = Company::where('id', $request['id'])->update([
                'title' => $request['title']
            ]);
        }else{
            $company = Company::create([
                'title' => $request['title']
            ]);
        }

        return response()->json([
            'message' => 'Company saved successfully'
        ], 200);
    }

    public function removeCompany($id)
    {
        $company = Company::where('id', $id)->first();
        if($company){
            $company->delete();
        }
        return response()->json([
            'message' => 'Company removed successfully'
        ], 200);
    }

    public function importCompanies(Request $request)
    {
        $resMsg = "";
        $resCode = 200;
        $dataArray = array();
        $itemsToImport = json_decode($request['import_data']);
        $importCount = 0;

        DB::beginTransaction();
        try {
            $import = new Company;
            foreach (array_chunk($itemsToImport, 1000) as $itemsToImport_chunked){
                foreach ($itemsToImport_chunked as $item) {
                    $check = Company::where('title', $item->title)->first();
                    if(!$check){
                        array_push($dataArray, array(
                            'title' => $item->title,
                        ));
                        $importCount++;
                    }
                }
                $import = $import->insert($dataArray);
            }
            $resMsg = 'Companies imported successfully ('.$importCount.')';
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
