<?php

namespace App\Http\Controllers;
use Illuminate\Http\Response;
use App\Models\Destination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class DestinationController extends Controller
{
    public function index()
    {
        // Recupera una destinazione casuale
        $destination = Destination::inRandomOrder()->first();

        // Imposta il cookie per la destinazione con scadenza di 24 ore
        $response = new Response('Set Destination Cookie');
        $response->cookie('destination', $destination->toJson(), 1440);

        return $destination;
    }
    
    
    public function showAll()
    {
        // Recupera tutte le destinazioni
        $destinations = Destination::all();

        return response()->json([
            'destinations' => $destinations,
        ]);
    }

    private function setDestinationCookie($destination)
{
    // Imposta il cookie per la destinazione con scadenza di 24 ore
    return response()->json(['destination' => $destination])->withCookie(cookie()->forever('destination', $destination->toJson()));
}


}
