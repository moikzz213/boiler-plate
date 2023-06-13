<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;

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
    // companies
    Route::get('/companies', [PageController::class, 'home'])->name('hr.companies');
    Route::get('/companies/page/{page}', [PageController::class, 'home'])->name('hr.companies.paginated');
    // industries
    Route::get('/industries', [PageController::class, 'home'])->name('hr.industries');
    Route::get('/industries/page/{page}', [PageController::class, 'home'])->name('hr.industries.paginated');
    // measures
    Route::get('/measures', [PageController::class, 'home'])->name('hr.measures');
    Route::get('/measures/page/{page}', [PageController::class, 'home'])->name('hr.measures.paginated');
    // weitages
    Route::get('/weightages', [PageController::class, 'home'])->name('hr.weightages');
    Route::get('/weightages/page/{page}', [PageController::class, 'home'])->name('hr.weightages.paginated');
    // employees
    Route::get('/employees/page/{page}', [PageController::class, 'home'])->name('hr.employees.paginated');
});

Route::prefix('manager')->group(function () {
    // my custom kpi
    Route::get('/custom/{type}', [PageController::class, 'home'])->name('hr.custom.kpi');
    Route::get('/custom/{type}/page/{page}', [PageController::class, 'home'])->name('hr.paginated.custom.kpi');
});
