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



// Auth::routes();
Auth::routes([
    'register' => false,
    'login' => false,
]);

/**
 * Root
 */
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/login', [PageController::class, 'home'])->name('login');
Route::get('/reset-password', [PageController::class, 'home'])->name('reset-password');
Route::get('/link/reset-password/employee-ecode', [PageController::class, 'home'])->name('reset-password-link');
Route::get('/dashboard', [PageController::class, 'home'])->name('dashboard');
Route::get('/manager/teams', [PageController::class, 'home'])->name('manager.teams');
Route::get('/manager/teams/member/{id}', [PageController::class, 'home'])->name('manager.teams.single.member');
Route::get('/manager/kpi', [PageController::class, 'home'])->name('manager.teams.kpi');

Route::get('/hr/employees', [PageController::class, 'home'])->name('hr.employees');
Route::get('/hr/employees/{ecode}', [PageController::class, 'home'])->name('hr.employees.single');
Route::get('/hr/custom/{type}', [PageController::class, 'home'])->name('hr.kpi.custom');
Route::get('/hr/custom/{type}/page/{page}', [PageController::class, 'home'])->name('hr.kpi.custom.paginated');
Route::get('/hr/master/{type}', [PageController::class, 'home'])->name('hr.kpi.master');
Route::get('/hr/master/{type}/page/{page}', [PageController::class, 'home'])->name('hr.kpi.master.paginated');
Route::get('/hr/settings/pms', [PageController::class, 'home'])->name('hr.settings.pms');
Route::get('/hr/settings/pms/page/{page}', [PageController::class, 'home'])->name('hr.settings.pms.paginated');
Route::get('/hr/settings/pms/{id}', [PageController::class, 'home'])->name('hr.settings.pms.single');
Route::get('/hr/settings/pms/new', [PageController::class, 'home'])->name('hr.settings.pms.new');


/**
 * Error pages
 */
Route::get('/unauthorized', [PageController::class, 'home'])->name('unauthorized');


/**
 * Save Client Access
 */
Route::post('/client/savekey', [ClientKeyController::class, 'saveKey'])->name('client.key.save');
Route::post('/client/removekey', [ClientKeyController::class, 'removeKey'])->name('client.access.remove');

/**
 * Sanctum login
 */
#Route::get('/access', [PublicPageController::class, 'access'])->name('sanctum.login');

/**
 * Admin routes
 */
Route::prefix('admin')->group(function () {
    Route::get('/', [PageController::class, 'home'])->name('admin');
    Route::get('/{slug}', [PageController::class, 'home'])->name('admin.slug');

    Route::get('/users', [PageController::class, 'home'])->name('admin.users');
    Route::get('/users/page/{page}', [PageController::class, 'home'])->name('admin.users.paginated');

    // users
    Route::get('/users/{ecode}', [PageController::class, 'home'])->name('admin.get.users');
});

/**
 * Normal routes
 */
// Route::prefix('u')->group(function () {
//     Route::get('/', [PageController::class, 'home'])->name('normal');
//     Route::get('/{slug}', [PageController::class, 'home'])->name('normal.slug');
// });

/**
 * Accout routes
 */
Route::prefix('account')->group(function () {
    Route::get('/', [PageController::class, 'home'])->name('account');
});

/**
 * Custom authentication
 */
#Route::post('login', [CustomAuthController::class, 'login'])->name('custom.login');

require __DIR__.'/dev/web/jc.php';
require __DIR__.'/dev/web/ri.php';
