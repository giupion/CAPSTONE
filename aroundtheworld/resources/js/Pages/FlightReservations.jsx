import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const FlightReservations = ({ auth, flightReservations }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Rimuovi l'hook useEffect perché i dati sono passati direttamente come props

    if (loading) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <Head title="Flight Reservations" />
                <div className="py-12">Loading...</div>
            </AuthenticatedLayout>
        );
    }

    if (error) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <Head title="Flight Reservations" />
                <div className="py-12">Error: {error}</div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Flight Reservations" />
            <div className="py-12">
            <h1 className="text-3xl font-semibold mb-6 text-white">I Tuoi Voli!</h1>
                {flightReservations.length > 0 ? (
                    flightReservations.map((reservation) => (
                        <div key={reservation.id} className="border p-4 rounded-md">
                            <p className="font-semibold text-white">ID Prenotazione: {reservation.id}</p>
                            <p className="font-semibold text-white">Compagnia aerea: {reservation.carrier_code}</p>
                            <p className="font-semibold text-white">Aeroporto Origine: {reservation.origin_city_code}</p>
                            <p className="font-semibold text-white"> Aeroporto Destinazione: {reservation.destination_city_code}</p>
                            <p className="font-semibold text-white">Durata: {reservation.duration}</p>
                            <p className="font-semibold text-white">Prezzo totale: {reservation.total_price}</p>
                            <p className="font-semibold text-white">Scadenza prenotazione: {reservation.booking_deadline}</p>
                            <p className="font-semibold text-white">Posti prenotabili: {reservation.bookable_seats}</p>
                            <p className="font-semibold text-white">Richiesta di biglietto immediata: {reservation.instant_ticketing_required ? 'Sì' : 'No'}</p>
                            <p className="font-semibold text-white">Volo diretto: {reservation.direct_flight ? 'Sì' : 'No'}</p>{/* Aggiungi altri dettagli della prenotazione se necessario */}
                        </div>
                    ))
                ) : (
                    <p>Nessuna prenotazione di volo trovata.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default FlightReservations;
