import React, { useEffect, useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const [destination, setDestination] = useState(null);
    const [isVacationMenuOpen, setIsVacationMenuOpen] = useState(false);

    useEffect(() => {
        const fetchRandomDestination = async () => {
            try {
                const response = await fetch('/api/random-destination');
                if (response.ok) {
                    const data = await response.json();
                    setDestination(data.destination);
                    localStorage.setItem('destination', JSON.stringify({ ...data.destination, expiresAt: Date.now() + 24 * 60 * 60 * 1000 })); // Salva la destinazione con il timestamp di scadenza
                } else {
                    console.error('Failed to fetch random destination:', response.status);
                }
            } catch (error) {
                console.error('Error fetching random destination:', error);
            }
        };

        // Verifica se c'è una destinazione salvata in localStorage e se è ancora valida
        const storedDestination = JSON.parse(localStorage.getItem('destination'));
        if (storedDestination && storedDestination.expiresAt > Date.now()) {
            setDestination(storedDestination);
        } else {
            fetchRandomDestination();
        }
    }, []);

    const handleVacationClick = () => {
        setIsVacationMenuOpen(!isVacationMenuOpen);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={(
                <nav className="bg-gray-800 rounded-lg" aria-label="Destinations" style={{ backgroundColor: 'rgba(0, 38, 61, 1)' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                        <div className="flex items-center justify-between h-full">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <h2 className="text-white font-semibold text-lg">AroundTheWorld</h2>
                                </div>
                            </div>
                            <div className="ml-4 flex items-center md:ml-6">
                                <InertiaLink
                                    href="/all-destinations"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    Tutte le nostre mete
                                </InertiaLink>
                                <InertiaLink
                                    href="/profile-and-reservations"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    Il mio profilo e prenotazioni
                                </InertiaLink>
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm font-medium"
                                        onClick={handleVacationClick}
                                    >
                                        Prenota la tua vacanza!
                                    </button>
                                    {isVacationMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                <InertiaLink
                                                    href="/book-flight"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                >
                                                    Prenota il tuo volo
                                                </InertiaLink>
                                                <InertiaLink
                                                    href="/book-hotel"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                >
                                                    Prenota il tuo hotel
                                                </InertiaLink>
                                                <InertiaLink
                                                    href="/book-car"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                >
                                                    Noleggia la tua auto
                                                </InertiaLink>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        >
            <Head title="Dashboard" />

            <div className="py-12" style={{ backgroundColor: 'rgba(0, 38, 61, 1)' }}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4" style={{ backgroundColor: 'rgba(0, 38, 61, 1)' }}>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {destination ? (
                            <div>
                                {destination.video_url ? (
                                    <video autoPlay controls className="w-full h-auto">
                                        <source src={destination.video_url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img
                                        src={destination.image_url}
                                        alt={destination.name}
                                        className="w-full h-64 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{destination.name}</h3>
                                    <p>{destination.description}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-64 bg-gray-300 flex items-center justify-center">Loading...</div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
