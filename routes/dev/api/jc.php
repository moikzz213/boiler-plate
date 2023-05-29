<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route; 
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\KeyPerformanceReviewController;
use App\Http\Controllers\IndustryController;

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
    Route::get('/dashboard/my-kpi/{year}', [ReviewController::class, 'KeyPerformance'])->name('dashboard.kpi');
    Route::get('/fetch/industries/non-paginate', [IndustryController::class, 'getNonPaginatedIndustries'])->name('fetch.industries.non-paginate');
});