import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const [destination, setDestination] = useState(null);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const storedDestination = JSON.parse(localStorage.getItem('destination'));
                const storedTimestamp = localStorage.getItem('timestamp');
                const currentTime = new Date().getTime();
                // Se la destinazione è memorizzata e sono passate meno di 24 ore dall'ultimo aggiornamento, utilizza quella memorizzata
                if (storedDestination && storedTimestamp && currentTime - storedTimestamp < 24 * 60 * 60 * 1000) {
                    setDestination(storedDestination);
                } else {
                    const response = await fetch('/api/destinations');
                    const data = await response.json();
                    if (data && data.destination) {
                        const imageUrls = data.destination.image_urls.map(url => url.split('?')[0]);
                        setDestination({ ...data.destination, image_urls: imageUrls });
                        // Salva la destinazione e il timestamp attuale nel localStorage
                        localStorage.setItem('destination', JSON.stringify(data.destination));
                        localStorage.setItem('timestamp', currentTime);
                    }
                }
            } catch (error) {
                console.error('Error fetching destination:', error);
            }
        };

        fetchDestination();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Around The World</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {destination ? (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {destination.image_urls && destination.image_urls.length > 0 ? (
                                    destination.image_urls.map((imageUrl, index) => (
                                        <img
                                            key={index}
                                            src={imageUrl}
                                            alt={destination.name}
                                            className="w-full h-64 object-cover"
                                        />
                                    ))
                                ) : (
                                    <div className="w-full h-64 bg-gray-300 flex items-center justify-center">Images not available</div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{destination.name}</h3>
                                <p>{destination.description}</p>
                            </div>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
