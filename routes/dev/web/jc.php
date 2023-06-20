<?php

use Illuminate\Support\Facades\Route; 
  
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
 