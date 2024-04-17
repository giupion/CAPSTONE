<?php

namespace App\Http\Controllers;

use App\Models\AccessToken;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class FlightSearchController extends Controller
{
    public function __invoke(Request $request, Client $client)
    {
        try {
            $accessToken = AccessToken::first();
            if (!$accessToken) {
                throw new \Exception('Nessun token trovato nel database.');
            }

            $headers = [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $accessToken->token
            ];

            $response = $client->get('https://test.api.amadeus.com/v2/shopping/flight-offers', [
                'headers' => $headers,
                'query' => [
                    'originLocationCode' => $request->input('originLocationCode'),
                    'destinationLocationCode' => $request->input('destinationLocationCode'),
                    'departureDate' => $request->input('departureDate'),
                    'adults' => $request->input('adults')
                ]
            ]);

            return $response->getBody();
        } catch (ClientException $exception) {
            Log::error('ClientException in FlightSearchController: ' . $exception->getMessage());
            return response()->json(['error' => 'Errore di autenticazione: verifica le credenziali.'], 401);
        } catch (ServerException $exception) {
            Log::error('ServerException in FlightSearchController: ' . $exception->getMessage());
            return response()->json(['error' => 'Errore del server: riprova più tardi.'], 500);
        } catch (\Exception $exception) {
            Log::error('Exception in FlightSearchController: ' . $exception->getMessage());
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }

    public function showFlightSearchForm(Request $request)
    {
        $formDataFromCitySearch = [
            'originLocationCode' => $request->input('originLocationCode'),
            'destinationLocationCode' => $request->input('destinationLocationCode')
        ];
        return Inertia::render('FlightSearchForm', ['formDataFromCitySearch' => $formDataFromCitySearch]);
    }
    
}
