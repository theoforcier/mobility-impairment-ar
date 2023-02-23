<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\FriendController;
use App\Http\Controllers\API\UserCustomTaskController;



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
        Route::get('remaining',       [UserCustomTaskController::class, 'remaining']);
        Route::get('{task}',          [UserCustomTaskController::class, 'show']);
        Route::put('{task}/rename',   [UserCustomTaskController::class, 'rename']);
        Route::put('{task}/complete', [UserCustomTaskController::class, 'complete']);
        Route::get('/',               [UserCustomTaskController::class, 'index']);
        Route::post('/',              [UserCustomTaskController::class, 'store']);
        Route::delete('{task}',       [UserCustomTaskController::class, 'destroy']);
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
    
});
