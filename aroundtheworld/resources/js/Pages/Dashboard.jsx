import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const [destination, setDestination] = useState(null);
    const [destinationsList, setDestinationsList] = useState([]);

    useEffect(() => {
        const fetchRandomDestination = async () => {
            try {
                const response = await fetch('/api/destinations');
                const data = await response.json();
                if (data && data.destination) {
                    setDestination(data.destination);
                }
            } catch (error) {
                console.error('Error fetching random destination:', error);
            }
        };

        const fetchDestinationsList = async () => {
            try {
                const response = await fetch('/api/destinations');
                const data = await response.json();
                if (data && data.destinations) {
                    setDestinationsList(data.destinations);
                }
            } catch (error) {
                console.error('Error fetching destinations list:', error);
            }
        };

        fetchRandomDestination();
        fetchDestinationsList();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Around The World</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <nav className="bg-gray-800" aria-label="Destinations">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <h2 className="text-white font-semibold text-lg">AroundTheWorld</h2>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {destinationsList.map((destination) => (
                                            <Link
                                                key={destination.id}
                                                href={`/destinations/${destination.id}`}
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                {destination.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div >
                                <div className="ml-4 flex items-center md:ml-6">
                                    <Link
                                        href="/destinations"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Tutte le nostre mete
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {destination ? (
                            <div>
                                <img
                                    src={destination.image_url}
                                    alt={destination.name}
                                    className="w-full h-64 object-cover"
                                />
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
