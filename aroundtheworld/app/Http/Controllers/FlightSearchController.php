<?php

namespace App\Http\Controllers;

use App\Models\AccessToken;
use App\Models\FlightBooking;
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
    
    public function bookFlight(Request $request)
    {
        // Validazione dei dati della richiesta
        $validatedData = $request->validate([
            // Aggiungi qui le regole di validazione per i dati della prenotazione del volo
        ]);

        // Salva la prenotazione del volo nel database
        $flightBooking = new FlightBooking();
        $flightBooking->user_id = auth()->id();
        $flightBooking->flight_id = $request->input('flight_id');
        $flightBooking->carrier_code = $request->input('carrier_code');
        $flightBooking->duration = $request->input('duration');
        $flightBooking->total_price = $request->input('total_price');
        $flightBooking->booking_deadline = $request->input('booking_deadline');
        $flightBooking->bookable_seats = $request->input('bookable_seats');
        $flightBooking->instant_ticketing_required = $request->input('instant_ticketing_required');
        $flightBooking->direct_flight = $request->input('direct_flight');
        // Continua ad assegnare altri campi se necessario

        $flightBooking->save();

        return response()->json(['message' => 'Prenotazione del volo effettuata con successo'], 201);
    }
}
