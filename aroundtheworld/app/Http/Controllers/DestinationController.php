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
        // Controlla se c'è una destinazione salvata nel cookie
        $destination = null;
        if (Cookie::has('destination')) {
            $destination = json_decode(Cookie::get('destination'));
        } else {
            // Se non c'è, recupera una destinazione casuale
            $destination = Destination::inRandomOrder()->first();
            // Salva la destinazione nel cookie con scadenza di 24 ore
            Cookie::queue('destination', $destination->toJson(), 1440);
        }

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
