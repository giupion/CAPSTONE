import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const [destinations, setDestinations] = useState([]);
    const [destinationImages, setDestinationImages] = useState({});

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await fetch('/api/destinations');
                const data = await response.json();
                if (data && data.destinations) {
                    setDestinations(data.destinations);
                }
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinations();
    }, []);

    useEffect(() => {
        const fetchDestinationImages = async () => {
            const newDestinationImages = {};
            for (const destination of destinations) {
                try {
                    const response = await fetch(`https://api.unsplash.com/photos/random?query=${destination.name}&client_id=bNOKThuTgvlWKXQs4GvQ9m9O5BaxX7f75tZ48AwaYBU`);
                    const data = await response.json();
                    if (data && data.urls && data.urls.regular) {
                        newDestinationImages[destination.name] = data.urls.regular;
                    }
                } catch (error) {
                    console.error(`Error fetching image for destination ${destination.name}:`, error);
                }
            }
            setDestinationImages(newDestinationImages);
        };

        if (destinations.length > 0) {
            fetchDestinationImages();
        }
    }, [destinations]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Around The World</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {destinations.map(destination => (
                            <div key={destination.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                {destinationImages[destination.name] ? (
                                    <img src={destinationImages[destination.name]} alt={destination.name} className="w-full h-40 object-cover" />
                                ) : (
                                    <div className="w-full h-40 bg-gray-300 flex items-center justify-center">nooo</div>
                                )}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{destination.name}</h3>
                                    <p>{destination.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
