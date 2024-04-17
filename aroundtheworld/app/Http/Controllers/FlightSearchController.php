<?php

namespace App\Http\Controllers;

use App\Models\AccessToken;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Assicurati di importare la classe Log

class FlightSearchController extends Controller
{
    public function __invoke(Request $request, Client $client)
    {
        try {
            // Recupera l'access token dal database
            $accessToken = AccessToken::first();

            // Verifica se esiste un token nel database
            if (!$accessToken) {
                throw new \Exception('Nessun token trovato nel database.');
            }

            // Costruisci l'intestazione Authorization
            $headers = [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . $accessToken->token
            ];

            // Fai la richiesta all'API di Amadeus
            $response = $client->get('https://test.api.amadeus.com/v2/shopping/flight-offers', [
                'headers' => $headers,
                'query' => [
                    'originLocationCode' => $request->input('originLocationCode'),
                    'destinationLocationCode' => $request->input('destinationLocationCode'),
                    'departureDate' => $request->input('departureDate'),
                    'adults' => $request->input('adults')
                ]
            ]);

            // Ritorna il corpo della risposta
            return $response->getBody();
        } catch (ClientException $exception) {
            // Registra l'errore nel file di log di Laravel utilizzando Log::error()
            Log::error('ClientException in FlightSearchController: ' . $exception->getMessage());

            // Ritorna una risposta di errore
            return response()->json(['error' => 'Errore di autenticazione: verifica le credenziali.'], 401);
        } catch (ServerException $exception) {
            // Registra l'errore nel file di log di Laravel utilizzando Log::error()
            Log::error('ServerException in FlightSearchController: ' . $exception->getMessage());

            // Ritorna una risposta di errore
            return response()->json(['error' => 'Errore del server: riprova più tardi.'], 500);
        } catch (\Exception $exception) {
            // Registra l'errore nel file di log di Laravel utilizzando Log::error()
            Log::error('Exception in FlightSearchController: ' . $exception->getMessage());

            // Ritorna una risposta di errore
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }
    public function showFlightSearchForm()
{
    return inertia('FlightSearchForm');
}
}
