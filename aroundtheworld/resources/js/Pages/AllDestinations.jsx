import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { InertiaLink } from '@inertiajs/inertia-react';

const AllDestinations = ({ auth }) => {
    const [destinations, setDestinations] = useState([]);
    const [hoveredId, setHoveredId] = useState(null);
    const containerRef = useRef(null);
    const videosRef = useRef({});

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

    const handleMouseEnter = (id) => {
        setHoveredId(id);
        playVideo(id);
    };

    const handleMouseLeave = () => {
        setHoveredId(null);
    };

    const playVideo = (id) => {
        if (videosRef.current[id]) {
            videosRef.current[id].play();
        }
    };

    const stopVideo = (id) => {
        if (videosRef.current[id]) {
            videosRef.current[id].pause();
            videosRef.current[id].currentTime = 0;
        }
    };

    const handleScroll = () => {
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const containerBottom = containerRef.current.getBoundingClientRect().bottom;

        if (containerTop >= 0 && containerBottom <= window.innerHeight) {
            playVideo(destinations[0].id);
        } else {
            stopVideo(destinations[0].id);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [destinations]);

    const renderMedia = (destination) => {
        if (destination.video_url) {
            return (
                <video
                    id={`video-${destination.id}`}
                    ref={(video) => (videosRef.current[destination.id] = video)}
                    autoPlay={hoveredId === destination.id}
                    loop
                    controls
                    className="w-full h-64 object-cover"
                >
                    <source src={destination.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        } else if (destination.image_url) {
            return <img src={destination.image_url} alt={destination.name} className="w-full h-64 object-cover" />;
        } else {
            return null;
        }
    };

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
                                    href="/book-flight"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    Prenota un volo
                                </InertiaLink>
                                <InertiaLink
                                    href="/profile-and-reservations"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    Il mio profilo e prenotazioni
                                </InertiaLink>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        >
            <Head title="Dashboard" />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold mb-8 text-white">Tutte le nostre mete</h1>
                <div
                    ref={containerRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    onMouseLeave={handleMouseLeave}
                >
                    {destinations.map((destination) => (
                        <div
                            key={destination.id}
                            className="bg-white rounded-lg overflow-hidden shadow-md"
                            onMouseEnter={() => handleMouseEnter(destination.id)}
                        >
                            {renderMedia(destination)}
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-2">{destination.name}</h2>
                                <p className="text-gray-700">{destination.description}</p>
                                <Link href={`/destinations/${destination.id}`} className="block mt-4 text-indigo-500">
                                    Scopri di più
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AllDestinations;
