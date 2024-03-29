import React, { useEffect, useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const [destination, setDestination] = useState(
        JSON.parse(localStorage.getItem('destination')) || null
    );

    useEffect(() => {
        // Verifica se c'è una destinazione salvata nel localStorage
        const storedDestination = JSON.parse(localStorage.getItem('destination'));
        if (storedDestination) {
            setDestination(storedDestination);
        }
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={(
                <nav className="bg-gray-800 rounded-lg" aria-label="Destinations" style={{ backgroundColor: 'rgba(0, 38, 61, 1)' }}> {/* Cambia il colore della navbar qui */}
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

            <div className="py-12" style={{ backgroundColor: 'rgba(0, 38, 61, 1)' }}> {/* Cambia il colore dello sfondo del contenitore principale */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4" style={{ backgroundColor: 'rgba(0, 38, 61, 1)' }}> {/* Cambia il colore dello sfondo del riquadro principale */}
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
