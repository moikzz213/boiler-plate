<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ClientKeyController;
use App\Http\Controllers\CustomAuthController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\PerformanceSettingController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::prefix('hr')->group(function () {
    // industries
    Route::get('/industries', [PageController::class, 'home'])->name('hr.industries');
    Route::get('/industries/page/{page}', [PageController::class, 'home'])->name('hr.industries.paginated');
    // measures
    Route::get('/measures', [PageController::class, 'home'])->name('hr.measures');
    Route::get('/measures/page/{page}', [PageController::class, 'home'])->name('hr.measures.paginated');
    // weitages
    Route::get('/weightages', [PageController::class, 'home'])->name('hr.weightages');
    Route::get('/weightages/page/{page}', [PageController::class, 'home'])->name('hr.weightages.paginated');
});

Route::prefix('manager')->group(function () {
    // my custom kpi
    Route::get('/custom-kpi/page/{page}', [PageController::class, 'home'])->name('hr.industries');
});
