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
        $request->validate([
            'flight_id' => 'required',
            'carrier_code' => 'required',
            'duration' => 'required',
            'total_price' => 'required',
            'booking_deadline' => 'required',
            'bookable_seats' => 'required',
            'instant_ticketing_required' => 'required',
            'direct_flight' => 'required',

            'origin_city_code' => 'required',
          
            'destination_city_code' => 'required',
            // Aggiungi altre regole di validazione se necessario
        ]);

        try {
            // Salva la prenotazione del volo nel database
            FlightBooking::create([
                'user_id' => auth()->id(), // Se l'utente è autenticato, puoi ottenere il suo ID così
                'flight_id' => $request->input('flight_id'),
                'carrier_code' => $request->input('carrier_code'),
                'duration' => $request->input('duration'),
                'total_price' => $request->input('total_price'),
                'booking_deadline' => $request->input('booking_deadline'),
                'bookable_seats' => $request->input('bookable_seats'),
                'instant_ticketing_required' => $request->input('instant_ticketing_required'),
                'direct_flight' => $request->input('direct_flight'),
                
                'origin_city_code' => $request->input('origin_city_code'),
                
                'destination_city_code' => $request->input('destination_city_code'),
                // Continua ad aggiungere altri campi se necessario
            ]);

            return response()->json(['message' => 'Prenotazione del volo effettuata con successo'], 201);
        } catch (\Exception $exception) {
            // Gestione degli errori
            Log::error('Errore durante la prenotazione del volo: ' . $exception->getMessage());
            return response()->json(['error' => 'Errore durante la prenotazione del volo'], 500);
        }
    }

    public function showFlightReservations(Request $request)
    {
        // Ottenere le prenotazioni dei voli dell'utente
        $flightReservations = FlightBooking::where('user_id', auth()->id())->get();
        
        // Restituisci la vista con le prenotazioni dei voli
        return Inertia::render('FlightReservations', ['flightReservations' => $flightReservations]);
    }
}
