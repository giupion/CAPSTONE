// CitySearch.jsx
import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { InertiaLink } from '@inertiajs/inertia-react';

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
                params: { keyword }
            });
            setResult(response?.data?.data || []);
        } catch (error) {
            setError('Errore durante la ricerca delle città.');
            console.error('Errore durante la ricerca delle città:', error);
        }
    };

    const handleDepartureChange = (e) => setDepartureKeyword(e.target.value);
    const handleArrivalChange = (e) => setArrivalKeyword(e.target.value);

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
                originLocationName: selectedDeparture.name,
                destinationLocationCode: selectedArrival.iataCode,
                destinationLocationName: selectedArrival.name
            };
            Inertia.visit(route('flight-search-form', {
                ...formData,
                originCityName: selectedDeparture.name,
                destinationCityName: selectedArrival.name
            }));
        } else {
            setError('Seleziona un aeroporto di partenza e uno di destinazione.');
        }
    };

    const renderCityResults = (results, handleSelect) => {
        return (
            <>
                <h2 className="search-results-title" style={{ color: 'white' }}>Risultati della ricerca:</h2>
                <Slider dots infinite speed={500} slidesToShow={3} slidesToScroll={1}>
                    {results.map((city) => (
                        <div key={city.iataCode} onClick={() => handleSelect(city)}>
                            <p style={{ color: 'white' }}>{city.name} - {city.iataCode}</p>
                        </div>
                    ))}
                </Slider>
            </>
        );
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="City Search" />
            <div className="form-container" style={{ textAlign: 'center' }}>
                <div className="search-inputs">
                    <div className="input-container" style={{ marginBottom: '20px' }}>
                        <input type="text" value={departureKeyword} onChange={handleDepartureChange} placeholder="Città di partenza" />
                        {departureResults.length > 0 && renderCityResults(departureResults, (city) => handleCitySelect(city, 'departure'))}
                        <button className="search-button" onClick={() => handleSearch(departureKeyword, setDepartureResults, 'departure')}>Cerca città di partenza</button>
                    </div>
                    <div className="input-container" style={{ marginBottom: '20px' }}>
                        <input type="text" value={arrivalKeyword} onChange={handleArrivalChange} placeholder="Città di arrivo" />
                        {arrivalResults.length > 0 && renderCityResults(arrivalResults, (city) => handleCitySelect(city, 'arrival'))}
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

export default CitySearch;
