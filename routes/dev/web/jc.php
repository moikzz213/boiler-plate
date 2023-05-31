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

Route::get('/print/kpi/{year}/{ecode}', [PublicPageController::class, 'access'])->name('hr.settings.pms.new');