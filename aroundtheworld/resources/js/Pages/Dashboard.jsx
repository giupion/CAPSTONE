import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const [destinations, setDestinations] = useState([]);
    const [destinationImage, setDestinationImage] = useState(null);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                // Effettua una richiesta al backend per ottenere le destinazioni
                const response = await fetch('/api/destinations');
                const data = await response.json();
                if (data && data.destinations) {
                    setDestinations(data.destinations);
                }
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        // Esegui la funzione per recuperare le destinazioni dal database
        fetchDestinations();
    }, []);

    useEffect(() => {
        // Funzione per ottenere un'immagine casuale da Unsplash basata sul nome della destinazione
        const fetchDestinationImage = async (destinationName) => {
            try {
                // Effettua una richiesta a Unsplash per ottenere un'immagine casuale
                const response = await fetch(`https://api.unsplash.com/photos/random?query=${destinationName}&client_id=YOUR_UNSPLASH_CLIENT_ID`);
                const data = await response.json();
                if (data && data.urls && data.urls.regular) {
                    setDestinationImage(data.urls.regular);
                }
            } catch (error) {
                console.error('Error fetching destination image:', error);
            }
        };

        if (destinations.length > 0) {
            // Scegli casualmente una destinazione ogni giorno
            const randomDestination = destinations[Math.floor(Math.random() * destinations.length)].name;

            // Esegui la funzione per recuperare l'immagine della destinazione selezionata casualmente
            fetchDestinationImage(randomDestination);
        }
    }, [destinations]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {destinationImage ? (
                                <img src={destinationImage} alt="Destination" className="max-w-full h-auto" />
                            ) : (
                                <p>Loading...</p>
                            )}
                            <p>You're logged in!</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
