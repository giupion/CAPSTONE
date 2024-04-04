<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use App\Models\AccessToken; // Assicurati di importare il modello AccessToken se esiste

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
                    'client_id' => env('AMADEUS_API_KEY'), // Modificato per usare la chiave API corretta
                    'client_secret' => env('AMADEUS_API_SECRET') // Modificato per usare il segreto API corretto
                ]
            ]);
            $response = $response->getBody();
            $access_token = json_decode($response)->access_token;

            // Memorizza l'access token nel database
            AccessToken::updateOrCreate([], ['token' => $access_token]);

            return $access_token;
        } catch (GuzzleException $exception) {
            dd($exception);
        }
    }
}
