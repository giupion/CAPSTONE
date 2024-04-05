<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use App\Models\Destination;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class DestinationController extends Controller
{
    public function index()
    {
        // Recupera una destinazione casuale
        $destination = Destination::inRandomOrder()->first();

        // Serializza la destinazione in formato JSON
        $destinationJson = json_encode($destination);

        // Imposta il cookie per la destinazione con scadenza di 24 ore
        $response = new Response('Set Destination Cookie');
        $response->cookie('destination', $destinationJson, 1440);

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

    public function getRandomDestination()
    {
        $destination = Destination::inRandomOrder()->first();
        return response()->json(['destination' => $destination]);
    }
    
    }

