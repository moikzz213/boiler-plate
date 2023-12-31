<?php

use Illuminate\Support\Facades\Route; 
  
use App\Http\Controllers\CronJobController;
use App\Http\Controllers\PublicPageController;
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

Route::get('/hr/reports', [PageController::class, 'home'])->name('hr.report-1');

Route::get('/print/kpi/{year}/{ecode}', [PublicPageController::class, 'access'])->name('hr.settings.pms.new');

/**
 * 
 *  Run by Cron Job  -  http://127.0.0.1:8083/opening-mid-year-end?key=Moikzz&c=Ghassan
 *  without the key it will not run the function
 * 
 */
 
 // Recommended to run every 4AM

 // Run every 1st day of the month
Route::get('/setting-opening', [CronJobController::class, 'setting_opening'])->name('opening.setting'); 

// Run every 1st day and last day of the month
Route::get('/opening-mid-year-end', [CronJobController::class, 'mid_year_end_opening_and_closing'])->name('opening.mid.year');

// Run daily
Route::get('/opening-probation-setting', [CronJobController::class, 'probation_setting_opening'])->name('opening.probation.setting');
Route::get('/probation-first-final-review', [CronJobController::class, 'probation_first_final_review'])->name('probation.first.final.review');  
Route::get('/run-daily-api-cron-job', [CronJobController::class, 'daily_reminder_to_managers'])->name('daily.run.cron.job');
// always run this at last
Route::get('/run-daily-api-probation-final-notification', [CronJobController::class, 'daily_reminder_probation_final_notification'])->name('daily.run.probation.final-notification');
Route::get('/generate/kpi-review', [CronJobController::class, 'manualCreateReview'])->name('manual.create.review');