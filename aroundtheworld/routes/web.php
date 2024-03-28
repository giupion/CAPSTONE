<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application; // Modifica questa riga
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
        'laravelVersion' => Application::VERSION, // Modifica questa riga
        'phpVersion' => PHP_VERSION,
    ]);
});

use App\Http\Controllers\DestinationController;

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
});




require __DIR__.'/auth.php';
