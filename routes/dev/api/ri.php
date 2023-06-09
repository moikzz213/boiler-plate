<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\MeasureController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\WeightageController;
use App\Http\Controllers\PerformanceSettingController;
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

Route::middleware('authkey')->prefix('hr')->group(function () {
    // companies
     Route::get('/companies', [CompanyController::class, 'getCompanies'])->name('hr.companies');
     Route::post('/company/save', [CompanyController::class, 'saveCompany'])->name('hr.company.save');
     Route::post('/company/remove/{id}', [CompanyController::class, 'removeCompany'])->name('hr.company.remove');

    // industries
    Route::get('/industries', [IndustryController::class, 'getPaginatedIndustries'])->name('hr.industry.paginated');
    Route::post('/industry/save', [IndustryController::class, 'saveIndustry'])->name('hr.industry.save');
    Route::post('/industry/remove/{id}', [IndustryController::class, 'removeIndustry'])->name('hr.industry.remove');
    // measures
    Route::get('/measures', [MeasureController::class, 'getPaginatedMeasures'])->name('hr.measure.paginated');
    Route::post('/measure/save', [MeasureController::class, 'saveMeasure'])->name('hr.measure.save');
    Route::post('/measure/remove/{id}', [MeasureController::class, 'removeMeasure'])->name('hr.measure.remove');
    // weightages
    Route::get('/weightages', [WeightageController::class, 'getPaginatedWeightages'])->name('hr.weightage.paginated');
    Route::post('/weightage/save', [WeightageController::class, 'saveWeightage'])->name('hr.weightage.save');
    Route::post('/weightage/remove/{id}', [WeightageController::class, 'removeWeightage'])->name('hr.weightage.remove');
    // kpi master
    Route::get('/kpis', [KeyPerformanceIndicatorMasterController::class, 'getPaginatedKpis'])->name('hr.kpi.paginated');
    Route::post('/kpi/save', [KeyPerformanceIndicatorMasterController::class, 'saveKpi'])->name('hr.kpi.save');
    Route::post('/kpi/remove/{id}', [KeyPerformanceIndicatorMasterController::class, 'removeKpi'])->name('hr.kpi.remove');
    // pms settings
    Route::post('/pms-settings/save', [PerformanceSettingController::class, 'saveSetting'])->name('hr.pms.settings.save');
    Route::get('/pms-setting/{id}', [PerformanceSettingController::class, 'getSingleSetting'])->name('hr.pms.settings.single');
    // custom kpi
    Route::get('/kpi/list/{status}', [KeyPerformanceIndicatorMasterController::class, 'getKpiByStatus'])->name('manager.custom.kpi.paginated');
    Route::post('/custom-kpi/approve', [KeyPerformanceIndicatorMasterController::class, 'approveCustomKpi'])->name('manager.custom.kpi.approve');
});

// manager
Route::middleware('authkey')->prefix('manager')->group(function () {
    Route::get('/my-custom-kpi/list/{ecode}', [KeyPerformanceIndicatorMasterController::class, 'getCustomKpiByEcode'])->name('manager.custom.kpi.paginated');
    Route::post('/my-custom-kpi/save', [KeyPerformanceIndicatorMasterController::class, 'saveCustomKpiWithProfileEcode'])->name('manager.custom.kpi.paginated');
    Route::post('/my-custom-kpi/remove/{id}', [KeyPerformanceIndicatorMasterController::class, 'removeCustomKpi'])->name('hr.measure.remove');
});

// admin
Route::middleware('authkey')->prefix('admin')->group(function () {
    Route::get('/user/all', [ProfileController::class, 'getUsers'])->name('admin.get.all.users');
    Route::get('/user/single/{ecode}', [ProfileController::class, 'getSingleUser'])->name('admin.get.single.user');
    Route::post('/account/save', [ProfileController::class, 'saveAccount'])->name('admin.save.account');
});

// companies
Route::middleware('authkey')->group(function () {
    // import
    Route::post('/import/industries', [IndustryController::class, 'importIndustries'])->name('import.industries');
    Route::post('/import/companies', [CompanyController::class, 'importCompanies'])->name('import.companies');

    // companies
    Route::get('/companies', [CompanyController::class, 'getCompanyList'])->name('companies.get.list');

    // industries
    Route::get('/industries', [IndustryController::class, 'getIndustries'])->name('industries.get.list');
});
