<?php


// app/Http/Controllers/CitySearchController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\AccessToken;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CitySearchController extends Controller
{
    public function search(Request $request)
    {
        try {
            $keyword = $request->input('keyword');
            $accessToken = AccessToken::first();

            if (!$accessToken) {
                throw new \Exception('Nessun token trovato nel database.');
            }

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $accessToken->token
            ])->get('https://test.api.amadeus.com/v1/reference-data/locations', [
                'subType' => 'CITY',
                'keyword' => $keyword,
            ]);

            if ($response->successful()) {
                $cities = $response->json()['data'];
                $cityResults = [];

                foreach ($cities as $city) {
                    $cityResults[] = [
                        'name' => $city['name'],
                        'iataCode' => $city['iataCode'],
                    ];
                }

                return response()->json(['data' => $cityResults]);
            } else {
                return response()->json(['error' => 'Errore durante la ricerca delle città'], $response->status());
            }
        } catch (\Exception $e) {
            Log::error('Exception in CitySearchController: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        return Inertia::render('CitySearch');
    }
}
