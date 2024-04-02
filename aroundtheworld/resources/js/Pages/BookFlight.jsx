import React, { useEffect, useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Dashboard({ auth }) {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await axios.get('https://sky-scanner3.p.rapidapi.com/flights/auto-complete', {
                    params: {
                        query: 'New York'
                    },
                    headers: {
                        'X-RapidAPI-Key': '47c233e402mshe486090fb7df9bcp148907jsnf79deff78d0f',
                        'X-RapidAPI-Host': 'sky-scanner3.p.rapidapi.com'
                    }
                });
                console.log(response.data);
                const destinationsData = response.data?.data || [];
                setDestinations(destinationsData.map(dest => ({
                    id: dest.navigation.entityId,
                    title: dest.presentation.title,
                    subtitle: dest.presentation.subtitle
                })));
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinations();
    }, []);

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
                        {destinations.length > 0 ? (
                            <div>
                                {destinations.map(dest => (
                                    <div key={dest.id}>
                                        <h3 className="text-lg font-semibold mb-2">{dest.title}</h3>
                                        <p>{dest.subtitle}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="w-full h-64 bg-gray-300 flex items-center justify-center">Caricamento...</div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}