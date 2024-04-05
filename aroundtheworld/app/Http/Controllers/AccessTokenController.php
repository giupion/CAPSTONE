<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use App\Models\AccessToken;
use Illuminate\Support\Facades\Log; // Assicurati di importare la classe Log

class AccessTokenController extends Controller
{
    public function __invoke(Client $client)
    {
        $url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
        try {
            $response = $client->post($url, [
                'headers' => [
                    'Accept' => 'application/json'
                ],
                'form_params' => [
                    'grant_type' => 'client_credentials',
                    'client_id' => env('lE3xvbrZfrrvFDYbYzYFRFzGs7uc3oma'), // Modificato per usare la chiave API corretta
                    'client_secret' => env('nseAdiv9Uk0fje3i') // Modificato per usare il segreto API corretto
                ]
            ]);
            $response = $response->getBody();
            $access_token = json_decode($response)->access_token;

            // Memorizza l'access token nel database
            AccessToken::updateOrCreate([], ['token' => $access_token]);

            return $access_token;
        } catch (GuzzleException $exception) {
            // Registra l'errore nel file di log
            error_log('GuzzleException in AccessTokenController: ' . $exception->getMessage());

            // In alternativa, puoi registrare l'errore nel file di log di Laravel utilizzando Log::error()
            Log::error('GuzzleException in AccessTokenController: ' . $exception->getMessage());
            
            // Ritorna una risposta di errore
            return response()->json(['error' => 'Errore durante la richiesta del token di accesso.'], 500);
        }
    }
}
