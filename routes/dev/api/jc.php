<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route; 
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\KeyPerformanceReviewController;
use App\Http\Controllers\KeyPerformanceIndicatorMasterController;

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

Route::middleware('authkey')->group(function () {
    Route::get('/dashboard/my-kpi/{id}/{year}', [ReviewController::class, 'KeyPerformance'])->name('dashboard.kpi');
    Route::get('/print/employee-kpi/year/{ecode}/{year}', [ProfileController::class, 'EmployeeKPI'])->name('print.employee.kpi');

    // Fetch Employee KPI by Year & Ecode - check if there is reviews or not
    Route::get('/fetch/employee-kpi/year/{ecode}/{year}', [ProfileController::class, 'KPIEmployeeByYear'])->name('fetch.employee.kpi.year');

    
    Route::get('/fetch/auth-profile/kpi/{ecode}', [ProfileController::class, 'fetchAuthProfile'])->name('fetch.employee.kpi.list');

    // Create Employee Review by Year
    Route::post('/create/employee-review/year', [ProfileController::class, 'createReviewByYear'])->name('create.review.by.year');

    // Create Employee KPI by manager
    Route::post('/create/employee-kpi-year', [ReviewController::class, 'createEmployeeKPI'])->name('create.employee.kpi.year');

    // delete KPI by manager
    Route::post('/delete/employee-kpi-year', [KeyPerformanceReviewController::class, 'deleteEmployeeKPI'])->name('delete.employee.kpi.year');
    
    Route::get('/fetch/industries/non-paginate', [IndustryController::class, 'getNonPaginatedIndustries'])->name('fetch.industries.non-paginate');
    Route::get('/fetch/master-kpi/non-paginate', [KeyPerformanceIndicatorMasterController::class, 'getNoNPaginatedKpis'])->name('fetch.master-kpi.non-paginate');
    Route::get('/fetch/master-custom-kpi/non-paginate/{ecode}', [KeyPerformanceIndicatorMasterController::class, 'getNoNPaginatedCustomKpis'])->name('fetch.master-custom-kpi.non-paginate');
    
     
});