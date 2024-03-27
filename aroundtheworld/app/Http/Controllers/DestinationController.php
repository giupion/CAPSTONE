<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DestinationController extends Controller
{
    public function index()
    {
        // Ottieni una destinazione casuale dal database
        $destination = Destination::inRandomOrder()->first();

        // Ottieni le immagini da Unsplash per la destinazione
        $imageUrls = $this->getDestinationImages($destination->name);

        // Restituisci i dettagli della destinazione come JSON
        return response()->json([
            'destination' => [
                'name' => $destination->name,
                'description' => $destination->description,
                'image_urls' => $imageUrls,
            ]
        ]);
    }

    private function getDestinationImages($query)
    {
        $response = Http::get('https://api.unsplash.com/photos/random', [
            'query' => $query,
            'client_id' => 'bNOKThuTgvlWKXQs4GvQ9m9O5BaxX7f75tZ48AwaYBU',
            'count' => 10, // Ottieni 10 immagini per ogni destinazione
        ]);

        if ($response->successful()) {
            $imageUrls = collect($response->json())->map(function ($image) {
                return $image['urls']['regular']; // Estrai solo l'URL base dell'immagine
            })->toArray();
    
            return $imageUrls;
        }

        return [];
    }
}
