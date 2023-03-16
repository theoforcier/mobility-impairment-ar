<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\FriendController;
use App\Http\Controllers\API\CustomUserTaskController;
use App\Http\Controllers\API\BasicUserTaskController;
use App\Http\Controllers\API\UserDistanceController;
use App\Http\Controllers\API\GroupController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::controller(RegisterController::class)->group(function() {
    Route::post('register', 'register');
    Route::post('login', 'login');
});


Route::middleware('auth:sanctum')->group( function () {

    Route::prefix('user/tasks/custom')->group(function() {
        Route::get('remaining',       [CustomUserTaskController::class, 'remaining']);
        Route::get('{task}',          [CustomUserTaskController::class, 'show']);
        Route::put('{task}/rename',   [CustomUserTaskController::class, 'rename']);
        Route::put('{task}/complete', [CustomUserTaskController::class, 'complete']);
        Route::get('/',               [CustomUserTaskController::class, 'index']);
        Route::post('/',              [CustomUserTaskController::class, 'store']);
        Route::delete('{task}',       [CustomUserTaskController::class, 'destroy']);
    });

    Route::prefix('user/tasks/basic')->group(function() {
        Route::get('{task}',          [BasicUserTaskController::class, 'show']);
        Route::put('{task}/complete', [BasicUserTaskController::class, 'complete']);
        Route::get('/',               [BasicUserTaskController::class, 'index']);
        Route::put('{task}/reroll',   [BasicUserTaskController::class, 'reroll']);
    });

    Route::prefix('user')->group(function () {
        Route::get('/',       [UserController::class, 'show']);
        Route::get('/search', [UserController::class, 'index']);
        Route::put('/',       [UserController::class, 'update']);
    });

    Route::prefix('friends')->group(function () {
        Route::post('/',        [FriendController::class, 'store']);
        Route::get('/',         [FriendController::class, 'friends']);
        Route::get('pending',   [FriendController::class, 'pending']);
        Route::put('{user}',    [FriendController::class, 'accept']);
        Route::delete('{user}', [FriendController::class, 'destroy']);
    });

    Route::prefix('distance')->group(function () {
        Route::get('/',      [UserDistanceController::class, 'show']);
        Route::post('/add',  [UserDistanceController::class, 'add']);
    });

    Route::prefix('groups')->group(function () {
        Route::get('/',      [GroupController::class, 'show']);
        Route::post('/',     [GroupController::class, 'store']);
    });
    
});
