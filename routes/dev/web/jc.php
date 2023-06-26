<?php

use Illuminate\Support\Facades\Route; 
  
use App\Http\Controllers\CronJobController;
use App\Http\Controllers\PublicPageController; 
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

Route::get('/print/kpi/{year}/{ecode}', [PublicPageController::class, 'access'])->name('hr.settings.pms.new');

/**
 * 
 *  Run by Cron Job  -  http://127.0.0.1:8083/opening-mid-year-end?key=Moikzz&c=Ghassan
 *  without the key it will not run the function
 * 
 */
 
Route::get('/setting-opening', [CronJobController::class, 'settingOpening'])->name('opening.setting');
Route::get('/opening-mid-year-end', [CronJobController::class, 'midYearEndOpeningAndClosing'])->name('opening.mid.year');
Route::get('/opening-probation-setting', [CronJobController::class, 'probationSettingOpening'])->name('opening.probation.setting');
Route::get('/probation-first-final-review', [CronJobController::class, 'probationFirstFinalReview'])->name('probation.first.final.review');

