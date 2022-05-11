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
use App\Http\Controllers\VisitorController;
use App\Http\Controllers\ActivityController;


Route::get('/', function () {
    return view('welcome');
});


Route::get('/officer', [OfficerController::class, 'index'])->name('officer_index');

Route::post('/officer', [OfficerController::class, 'store'])->name('officer_insert');

Route::post('/editOfficer', [OfficerController::class, 'edit'])->name('update_officer');

Route::post('/getOfficerDetailByID', [OfficerController::class, 'getDetail'])->name('officer_detail');


Route::post('/toggleOfficerStatus', [OfficerController::class, 'toggleStatus'])->name('toggle_officer_status');



// visitor related routes
Route::get('/visitor', [VisitorController::class, 'index'])->name('visitor_index');
Route::post('/visitor', [VisitorController::class, 'store'])->name('visitor_insert');

Route::post('/editVisitor', [VisitorController::class, 'edit'])->name('update_visitor');

Route::post('/getVisitorDetailByID', [VisitorController::class, 'getDetail'])->name('visitor_detail');

Route::post('/toggleVisitorStatus', [VisitorController::class, 'toggleStatus'])->name('toggle_visitor_status');


// activity related routes 
Route::get('/activity', [ActivityController::class, 'index'])->name('activity_index');

Route::post('/activity', [ActivityController::class, 'store'])->name('activity_insert');

Route::get('/fetchActivity', [ActivityController::class, 'fetchActivity'])->name('activity_index');
