import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

const getCookie = (name) => {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}

export default function Dashboard({ auth }) {
    const [destination, setDestination] = useState({});
    const [destinationImages, setDestinationImages] = useState([]);

    useEffect(() => {
        const cachedData = getCookie('destinationData');
        if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            setDestination(parsedData.destination);
            // Se le immagini non sono già state memorizzate, esegui il fetch
            if (!parsedData.images || parsedData.images.length === 0) {
                fetchDestinationImages(parsedData.destination.name);
            } else {
                // Limita il numero di immagini a 2
                setDestinationImages(parsedData.images.slice(0, 2));
            }
        } else {
            fetchDestinations();
        }
    }, []);

    const fetchDestinations = async () => {
        try {
            const response = await fetch('/api/destinations');
            const data = await response.json();
            if (data && data.destinations) {
                const randomIndex = Math.floor(Math.random() * data.destinations.length);
                const selectedDestination = data.destinations[randomIndex];
                setDestination(selectedDestination);
                fetchDestinationImages(selectedDestination.name);
                setCookie('destinationData', JSON.stringify({ destination: selectedDestination, images: [] }), 1); // Imposta la scadenza del cookie a 1 giorno
            }
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    };

    const fetchDestinationImages = async (destinationName) => {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random?query=${destinationName}&client_id=bNOKThuTgvlWKXQs4GvQ9m9O5BaxX7f75tZ48AwaYBU&count=2`);
            if (!response.ok) {
                throw new Error('Rate limit exceeded');
            }
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                const images = data.map(image => image.urls.regular);
                setDestinationImages(images);
                // Aggiorna il cookie con le nuove immagini
                const updatedData = { destination, images };
                setCookie('destinationData', JSON.stringify(updatedData), 1);
            } else {
                console.error('No images found for the destination:', destinationName);
            }
        } catch (error) {
            console.error('Error fetching destination images:', error);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Around The World</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <p>{destination.description}</p>
                    <p className="my-5"><strong>Gallery of {destination.name}:</strong></p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                        {destinationImages.map((image, index) => (
                            <div key={index} className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <img src={image} alt={`Destination Image ${index + 1}`} className="w-full h-40 object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
