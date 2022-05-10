<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use App\Http\Controllers\OfficerController;


Route::get('/', function () {
    return view('welcome');
});


Route::get('/officer', [OfficerController::class, 'index'])->name('officer_index');

Route::post('/officer', [OfficerController::class, 'store'])->name('officer_insert');

Route::post('/editOfficer', [OfficerController::class, 'edit'])->name('update_officer');

Route::post('/getOfficerDetailByID', [OfficerController::class, 'getDetail'])->name('officer_detail');


Route::post('/toggleOfficerStatus', [OfficerController::class, 'toggleStatus'])->name('toggle_officer_status');