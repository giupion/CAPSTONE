// Destinations.jsx

import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function Destinations() {
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
            <ul>
                {destinations.map(destination => (
                    <li key={destination.id}>
                        <Link href={`/destinations/${destination.id}`}>{destination.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
