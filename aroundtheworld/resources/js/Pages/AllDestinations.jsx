import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/inertia-react';

const AllDestinations = () => {
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
        <div>
            <h1>Tutte le nostre mete</h1>
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
    );
};

export default AllDestinations;
