// CitySearch.jsx

import React, { useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const CitySearch = ({ auth }) => {
    const [departureKeyword, setDepartureKeyword] = useState('');
    const [arrivalKeyword, setArrivalKeyword] = useState('');
    const [departureResults, setDepartureResults] = useState([]);
    const [arrivalResults, setArrivalResults] = useState([]);
    const [selectedDeparture, setSelectedDeparture] = useState(null);
    const [selectedArrival, setSelectedArrival] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async (keyword, setResult, type) => {
        try {
            const response = await axios.get('/api/cities', {
                params: {
                    keyword: keyword
                }
            });

            if (response && response.data && response.data.data) {
                setResult(response.data.data);
            } else {
                setResult([]);
            }
        } catch (error) {
            setError('Errore durante la ricerca delle città.');
            console.error('Errore durante la ricerca delle città:', error);
        }
    };

    const handleDepartureChange = (e) => {
        setDepartureKeyword(e.target.value);
    };

    const handleArrivalChange = (e) => {
        setArrivalKeyword(e.target.value);
    };

    const handleCitySelect = (city, type) => {
        if (type === 'departure') {
            setSelectedDeparture(city);
        } else if (type === 'arrival') {
            setSelectedArrival(city);
        }
    };

    const handleConfirm = () => {
        if (selectedDeparture && selectedArrival) {
            const formData = {
                originLocationCode: selectedDeparture.iataCode,
                destinationLocationCode: selectedArrival.iataCode
            };
            // Passaggio dei dati al componente FlightSearchForm
            Inertia.visit('/flight-search-form', { formData });
        } else {
            setError('Seleziona un aeroporto di partenza e uno di destinazione.');
        }
    };

    const NextArrow = (props) => {
        const { className, onClick } = props;
        return <div className={className} onClick={onClick}>Next</div>;
    };

    const PrevArrow = (props) => {
        const { className, onClick } = props;
        return <div className={className} onClick={onClick}>Prev</div>;
    };

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="City Search" />
            <div className="form-container" style={{ textAlign: 'center' }}>
                <div className="search-inputs">
                    <div className="input-container" style={{ marginBottom: '20px' }}>
                        <input type="text" value={departureKeyword} onChange={handleDepartureChange} placeholder="Città di partenza" />
                        {departureResults.length > 0 && (
                            <div className="city-results" style={{ marginBottom: '20px' }}>
                                <h2 className="search-results-title" style={{ color: 'white' }}>Risultati della ricerca per città di partenza:</h2>
                                <Slider {...carouselSettings}>
                                    {departureResults.map((city) => (
                                        <FlightCard key={city.iataCode} city={city} handleCitySelect={(city) => handleCitySelect(city, 'departure')} />
                                    ))}
                                </Slider>
                            </div>
                        )}
                        <button className="search-button" onClick={() => handleSearch(departureKeyword, setDepartureResults, 'departure')}>Cerca città di partenza</button>
                    </div>
                    <div className="input-container" style={{ marginBottom: '20px' }}>
                        <input type="text" value={arrivalKeyword} onChange={handleArrivalChange} placeholder="Città di arrivo" />
                        {arrivalResults.length > 0 && (
                            <div className="city-results" style={{ marginBottom: '20px' }}>
                                <h2 className="search-results-title" style={{ color: 'white' }}>Risultati della ricerca per città di arrivo:</h2>
                                <Slider {...carouselSettings}>
                                    {arrivalResults.map((city) => (
                                        <FlightCard key={city.iataCode} city={city} handleCitySelect={(city) => handleCitySelect(city, 'arrival')} />
                                    ))}
                                </Slider>
                            </div>
                        )}
                        <button className="search-button" onClick={() => handleSearch(arrivalKeyword, setArrivalResults, 'arrival')}>Cerca città di arrivo</button>
                    </div>
                </div>
            </div>
            <div className="selected-airports">
                <h2 style={{ color: 'white' }}>Aeroporti Selezionati:</h2>
                <ul>
                    {selectedDeparture && <li style={{ color: 'white' }}>{selectedDeparture.name} - {selectedDeparture.iataCode} (Partenza)</li>}
                    {selectedArrival && <li style={{ color: 'white' }}>{selectedArrival.name} - {selectedArrival.iataCode} (Arrivo)</li>}
                </ul>
            </div>
            <button className="search-button" onClick={handleConfirm}>Conferma</button>
            {error && (
                <div className="error">
                    <p>{error}</p>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

const FlightCard = ({ city, handleCitySelect }) => {
    const handleClick = () => {
        handleCitySelect(city);
    };

    return (
        <div onClick={handleClick}>
            <p style={{ color: 'white' }}>{city.name} - {city.iataCode}</p>
        </div>
    );
};

export default CitySearch;
