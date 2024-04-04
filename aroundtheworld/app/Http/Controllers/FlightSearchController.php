<?php

namespace App\Http\Controllers;

use App\Models\AccessToken;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Request;

class FlightSearchController extends Controller
{
    public function __invoke(Request $request, Client $client)
    {
        // Recupera l'access token dal database
        $access_token = AccessToken::first()->token;
    
        $url = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
        $data = [
            'originLocationCode'     => $request->input('originLocationCode'),
            'destinationLocationCode' => $request->input('destinationLocationCode'),
            'departureDate'           => $request->input('departureDate'),
            'adults'                  => $request->input('adults')
        ];
    
        try {
            $response = $client->get($url, [
                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer ' . $access_token
                ],
                'query' => $data // Usa 'query' invece di 'form_params' per le richieste GET
            ]);
    
            return $response->getBody();
        } catch (GuzzleException $exception) {
            dd($exception);
        }
    }}