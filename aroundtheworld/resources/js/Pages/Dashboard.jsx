import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const [destination, setDestination] = useState(null);

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

        fetchRandomDestination();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Around The World</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
