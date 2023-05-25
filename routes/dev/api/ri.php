<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\PerformanceSettingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('authkey')->prefix('hr')->group(function () {
    Route::get('/industries', [IndustryController::class, 'getPaginatedIndustries'])->name('hr.industry.paginated');
    Route::post('/industry/save', [IndustryController::class, 'saveIndustry'])->name('hr.industry.save');
    Route::post('/industry/remove/{id}', [IndustryController::class, 'removeIndustry'])->name('hr.industry.remove');
});
