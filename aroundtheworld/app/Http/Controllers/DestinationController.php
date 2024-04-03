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
    public function getAirports()
    {
        $destinations = Destination::all();
        $airports = [];
        
        foreach ($destinations as $destination) {
            // Esegui la richiesta API per ottenere gli aeroporti per ogni destinazione
            $response = Http::withHeaders([
                'X-RapidAPI-Key' => '47c233e402mshe486090fb7df9bcp148907jsnf79deff78d0f',
                'X-RapidAPI-Host' => 'sky-scanner3.p.rapidapi.com'
            ])->get('https://sky-scanner3.p.rapidapi.com/flights/auto-complete', [
                'query' => $destination->name
            ]);
    
            // Stampa la risposta sulla console
            dd($response->json());
    
            // Estrai gli aeroporti dalla risposta e aggiungili alla lista
            $airports[$destination->name] = $response->json()['data'];
        }
        
        return $airports;
    }
    }

