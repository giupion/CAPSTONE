<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function index()
{
    // Recupera una destinazione casuale
    return Destination::inRandomOrder()->first();
}


    public function showAll()
    {
        // Recupera tutte le destinazioni
        $destinations = Destination::all();

        return response()->json([
            'destinations' => $destinations,
        ]);
    }
}
