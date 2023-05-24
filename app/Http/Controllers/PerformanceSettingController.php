<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PerformanceSetting;

class PerformanceSettingController extends Controller
{
    public function getPaginatedPerformanceSettings()
    {
        $pmsSettings = PerformanceSetting::paginate(20);
        return response()->json($pmsSettings, 200);
    }
}
