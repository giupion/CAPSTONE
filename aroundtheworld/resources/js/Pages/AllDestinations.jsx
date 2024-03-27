// components/AllDestinations.js

import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';

const AllDestinations = () => {
    const [destinations, setDestinations] = useState([]);

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

    return (
        <div>
            <h1>Tutte le nostre mete</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map(destination => (
                    <div key={destination.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                        <img src={destination.image_url} alt={destination.name} className="w-full h-64 object-cover" />
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{destination.name}</h2>
                            <p className="text-gray-700">{destination.description}</p>
                            <Link href={`/destinations/${destination.id}`} className="block mt-4 text-indigo-500">Scopri di più</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllDestinations;
