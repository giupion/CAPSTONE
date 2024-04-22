<?php

use App\Http\Controllers\CitySearchController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\FlightSearchController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => app()->version(),
        'phpVersion' => phpversion(),
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
        return Inertia::render('BookFlight');
    })->name('book-flight');
    
    Route::post('/api/search', [FlightSearchController::class, '__invoke'])->name('search');
    Route::get('/flight-search-form', [FlightSearchController::class, 'showFlightSearchForm'])->name('flight-search-form');
    Route::post('/api/book-flight', [FlightSearchController::class, 'bookFlight'])->name('book-flight');

    Route::get('/api/airports', [DestinationController::class, 'getAirports']);
    Route::get('/api/cities', [CitySearchController::class, 'search']);
    Route::get('/city-search', [CitySearchController::class, 'index'])->name('city-search');
    Route::get('/flight-reservations', [FlightSearchController::class, 'showFlightReservations'])->name('flight-reservations.index');
});

require __DIR__.'/auth.php';
