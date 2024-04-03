<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\FlightSearchController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $destination = (new DestinationController())->index();
        return Inertia::render('Dashboard', ['destination' => $destination]);
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/api/destinations', [DestinationController::class, 'showAll']);
    Route::get('/all-destinations', function () {
        return inertia('AllDestinations');
    });

    Route::get('/book-flight', function () {
        $user = auth()->user(); // Recupera l'utente autenticato
        $airports = (new DestinationController())->getAirports();
        return Inertia::render('BookFlight', ['user' => $user, 'airports' => $airports]);
    });
    
    Route::get('/search', 'FlightSearchController@search');

    Route::get('/api/airports', [DestinationController::class, 'getAirports']);
});




require __DIR__.'/auth.php';
