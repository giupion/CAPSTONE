import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const FlightReservations = ({ auth }) => {
    const [flightReservations, setFlightReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFlightReservations = async () => {
            try {
                const response = await fetch('/api/flight-reservations');
                if (response.ok) {
                    const data = await response.json();
                    setFlightReservations(data.flightReservations);
                    setLoading(false);
                } else {
                    setError(`Failed to fetch flight reservations: ${response.status}`);
                }
            } catch (error) {
                setError(`Error fetching flight reservations: ${error.message}`);
            }
        };

        if (auth.user) {
            fetchFlightReservations();
        }

        return () => setLoading(true); // Reset loading state when component unmounts or auth.user changes
    }, [auth.user]);

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
                {flightReservations.length > 0 ? (
                    flightReservations.map((reservation) => (
                        <div key={reservation.id} className="border p-4 rounded-md">
                            <p className="font-semibold">ID Prenotazione: {reservation.id}</p>
                            <p>Compagnia aerea: {reservation.carrier_code}</p>
                            <p>Origine: {reservation.origin_city_code}</p>
                            <p>Destinazione: {reservation.destination_city_code}</p>
                            {/* Add other reservation details if needed */}
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
