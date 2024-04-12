<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\FlightSearchController;
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

// Welcome Page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => app()->version(),
        'phpVersion' => phpversion(),
        
    ]);
});

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        $destination = (new DestinationController())->index();
        return Inertia::render('Dashboard', ['destination' => $destination]);
    })->name('dashboard');

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Destination Routes
    Route::get('/api/destinations', [DestinationController::class, 'showAll']);
    Route::get('/all-destinations', function () {
        return inertia('AllDestinations');
    });

    // Flight Booking Page
    Route::get('/book-flight', function () {
        return Inertia::render('BookFlight'); // Assicurati che 'BookFlight' sia il nome corretto del componente React per la pagina di prenotazione del volo
    })->name('book-flight');
    
    // Flight Search
    Route::post('/api/search', [FlightSearchController::class, '__invoke'])->name('search');
    // Modifica la route per la ricerca del volo da GET a POST come definito nel componente React

    // Airport API
    Route::get('/api/airports', [DestinationController::class, 'getAirports']);
});

// Authentication Routes
require __DIR__.'/auth.php';
