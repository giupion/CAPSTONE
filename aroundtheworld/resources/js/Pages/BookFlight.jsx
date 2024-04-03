import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const BookFlight = ({ airports, user }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Controlla se gli aeroporti sono stati caricati
        if (Object.keys(airports).length > 0) {
            setLoading(false); // Imposta lo stato del caricamento su false quando gli aeroporti sono stati caricati
        }
    }, [airports]);

    return (
        <AuthenticatedLayout user={user}>
            <Head title="BookFlight" />
            <div className="py-12" style={{ backgroundColor: 'rgba(0, 38, 61, 1)' }}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4" style={{ backgroundColor: 'rgba(0, 38, 61, 1)' }}>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            {loading ? (
                                <div className="w-full h-64 bg-gray-300 flex items-center justify-center">Caricamento...</div>
                            ) : (
                                <div>
                                    {Object.keys(airports).map((destinationName, index) => (
                                        <div key={index}>
                                            <h3 className="text-lg font-semibold mb-2">{destinationName}</h3>
                                            <div>
                                                {/* Verifica se airports[destinationName] è un array prima di chiamare map */}
                                                {Array.isArray(airports[destinationName]) ? (
                                                    airports[destinationName].map((airport, airportIndex) => (
                                                        <div key={airportIndex}>
                                                            <h4>{airport.presentation?.title}</h4>
                                                            <p>{airport.presentation?.subtitle}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>
                                                        <h4>{airports[destinationName].presentation?.title}</h4>
                                                        <p>{airports[destinationName].presentation?.subtitle}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default BookFlight;
