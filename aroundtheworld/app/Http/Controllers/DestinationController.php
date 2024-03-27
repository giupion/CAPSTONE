<?php
namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Support\Facades\Cache;

class DestinationController extends Controller
{
    public function index()
    {
        // Controlla se la destinazione casuale è già in cache
        $destination = Cache::remember('random_destination', 60 * 24, function () {
            // Ottieni una destinazione casuale
            return Destination::inRandomOrder()->first();
        });

        return response()->json([
            'destination' => $destination,
        ]);
    }


    public function showAll()
    {
        $destinations = Destination::all();

        return view('all_destinations', compact('destinations'));
    }
}
