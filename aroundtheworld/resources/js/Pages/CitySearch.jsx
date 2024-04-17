import React, { useState } from 'react';
import Axios from 'axios'; // Importa Axios
import { Inertia } from '@inertiajs/inertia'; // Importa Inertia
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Slider from 'react-slick'; // Importa Slider da react-slick
import 'slick-carousel/slick/slick.css'; // Importa gli stili di default di react-slick
import 'slick-carousel/slick/slick-theme.css'; // Importa gli stili del tema di default di react-slick

// Componente per la freccia successiva
const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className + ' custom-arrow next-arrow'}
            style={{ ...style, display: 'block', background: 'green' }}
            onClick={onClick}
        />
    );
};

// Componente per la freccia precedente
const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className + ' custom-arrow prev-arrow'}
            style={{ ...style, display: 'block', background: 'green' }}
            onClick={onClick}
        />
    );
};

const CitySearch = ({ auth }) => {
    const [departureKeyword, setDepartureKeyword] = useState('');
    const [arrivalKeyword, setArrivalKeyword] = useState('');
    const [departureResults, setDepartureResults] = useState([]);
    const [arrivalResults, setArrivalResults] = useState([]);
    const [selectedAirports, setSelectedAirports] = useState([]);
    const [error, setError] = useState(null);

    const handleDepartureChange = (e) => {
        setDepartureKeyword(e.target.value);
    };

    const handleArrivalChange = (e) => {
        setArrivalKeyword(e.target.value);
    };

    const handleSearch = async (keyword, setResult) => {
        try {
            const response = await Axios.get('/api/cities', {
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

    const handleFlightBooking = (originLocationCode, destinationLocationCode) => {
        const updatedSelectedAirports = [...selectedAirports, { origin: originLocationCode, destination: destinationLocationCode }];
        setSelectedAirports(updatedSelectedAirports);
    };

    const handleConfirm = () => {
        // Verifica se ci sono aeroporti selezionati
        if (selectedAirports.length > 0) {
            // Estrai i codici IATA dall'array degli aeroporti selezionati
            const firstAirport = selectedAirports[0];
            const secondAirport = selectedAirports.length > 1 ? selectedAirports[1] : null;

            // Costruisci l'URL con i codici IATA come parametri
            let url = '/book-flight?originLocationCode=' + firstAirport.origin + '&destinationLocationCode=' + firstAirport.destination;
            if (secondAirport) {
                url += '&originLocationCode2=' + secondAirport.origin + '&destinationLocationCode2=' + secondAirport.destination;
            }

            // Effettua la navigazione utilizzando Inertia
            Inertia.visit(url);
        } else {
            setError('Seleziona almeno un volo per confermare.');
        }
    };

    // Configurazione del carousel
    const carouselSettings = {
        dots: true, // Mostra i puntini
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />, // Freccia successiva personalizzata
        prevArrow: <PrevArrow />  // Freccia precedente personalizzata
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="City Search" />
            <div className="form-container" style={{ textAlign: 'center' }}>
                <div className="search-inputs">
                    {/* Input per la città di partenza */}
                    <div className="input-container" style={{ marginBottom: '20px' }}>
                        <input type="text" value={departureKeyword} onChange={handleDepartureChange} placeholder="Città di partenza" />
                        {/* Mostra i risultati della ricerca per la città di partenza */}
                        {departureResults.length > 0 && (
                            <div className="city-results" style={{ marginBottom: '20px' }}>
                                <h2 className="search-results-title" style={{ color: 'white' }}>Risultati della ricerca per città di partenza:</h2>
                                <Slider {...carouselSettings}>
                                    {departureResults.map((city) => (
                                        <FlightCard key={city.iataCode} city={city} handleFlightBooking={handleFlightBooking} />
                                    ))}
                                </Slider>
                            </div>
                        )}
                        <button className="search-button" onClick={() => handleSearch(departureKeyword, setDepartureResults)}>Cerca città di partenza</button>
                    </div>
                    {/* Input per la città di arrivo */}
                    <div className="input-container" style={{ marginBottom: '20px' }}>
                        <input type="text" value={arrivalKeyword} onChange={handleArrivalChange} placeholder="Città di arrivo" />
                        {/* Mostra i risultati della ricerca per la città di arrivo */}
                        {arrivalResults.length > 0 && (
                            <div className="city-results" style={{ marginBottom: '20px' }}>
                                <h2 className="search-results-title" style={{ color: 'white' }}>Risultati della ricerca per città di arrivo:</h2>
                                <Slider {...carouselSettings}>
                                    {arrivalResults.map((city) => (
                                        <FlightCard key={city.iataCode} city={city} handleFlightBooking={handleFlightBooking} />
                                    ))}
                                </Slider>
                            </div>
                        )}
                        <button className="search-button" onClick={() => handleSearch(arrivalKeyword, setArrivalResults)}>Cerca città di arrivo</button>
                    </div>
                </div>
            </div>
            {/* Visualizza gli aeroporti selezionati */}
            <div className="selected-airports">
                <h2 style={{ color: 'white' }}>Aeroporti Selezionati:</h2>
                <ul>
                    {selectedAirports.map((airport, index) => (
                        <li key={index} style={{ color: 'white' }}>{airport.origin} - {airport.destination}</li>
                    ))}
                </ul>
            </div>
            {/* Bottone di conferma per prenotare i voli */}
            <button className="search-button" onClick={handleConfirm}>Conferma</button>
            {/* Visualizza l'eventuale errore */}
            {error && (
                <div className="error">
                    <p>{error}</p>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

// Componente per il singolo aeroporto
const FlightCard = ({ city, handleFlightBooking }) => {
    return (
        <div onClick={() => handleFlightBooking('', city.iataCode)}>
            <p style={{ color: 'white' }}>{city.name} - {city.iataCode}</p>
        </div>
    );
};

export default CitySearch;
