<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class AccessTokenController extends Controller
{
    public function __invoke(Client $client)
    { $url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
        try {
            $response = $client->post($url, [
                'headers' => [
                    'Accept' => 'application/json'
                ],
                'form_params' => [
                    'grant_type' => 'client_credentials',
                    'client_id' => env('qktWDxpDSgvJqtuHifcf7HSknszmf6lr'),
                    'client_secret' => env('TXApaICAvn6Tp73I')
                ]
            ]);
            $response = $response->getBody();
            $access_token = json_decode($response)->access_token;
            return $response;
        } catch (GuzzleException $exception) {
            dd($exception);
        }
    }
}
