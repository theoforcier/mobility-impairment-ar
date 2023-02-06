<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\FriendController;



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

    Route::prefix('user')->group(function () {
        Route::get('/', [UserController::class, 'show']);
        Route::put('/', [UserController::class, 'update']);
    });

    Route::prefix('friend')->group(function () {
        Route::post('/',       [FriendController::class, 'store']);
        Route::get('/',        [FriendController::class, 'friends']);
        Route::get('/pending', [FriendController::class, 'pending']);
        Route::put('/',        [FriendController::class, 'accept']);
        Route::delete('/',     [FriendController::class, 'destroy']);
    });
    
});
