import React, { useState } from 'react';
import Axios from 'axios'; // Importa Axios
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
                    <div className="input-container" style={{ marginBottom: '20px' }}>
                        <input type="text" value={departureKeyword} onChange={handleDepartureChange} placeholder="Città di partenza" />
                        {departureResults.length > 0 && (
                            <div className="city-results" style={{ marginBottom: '20px' }}>
                                <h2 className="search-results-title" style={{ color: 'white' }}>Risultati della ricerca per città di partenza:</h2>
                                <Slider {...carouselSettings}>
                                    {departureResults.map((city) => (
                                        <div key={city.iataCode}>
                                            <p style={{ color: 'white' }}>{city.name} - {city.iataCode}</p>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        )}
                        <button className="search-button" onClick={() => handleSearch(departureKeyword, setDepartureResults)}>Cerca città di partenza</button>
                    </div>
                    <div className="input-container" style={{ marginBottom: '20px' }}>
    <input type="text" value={arrivalKeyword} onChange={handleArrivalChange} placeholder="Città di arrivo" />
    {arrivalResults.length > 0 && (
        <div className="city-results" style={{ marginBottom: '20px' }}>
            <h2 className="search-results-title" style={{ color: 'white' }}>Risultati della ricerca per città di arrivo:</h2>
            <Slider {...carouselSettings}>
                {arrivalResults.map((city) => (
                    <div key={city.iataCode}>
                        <p style={{ color: 'white' }}>{city.name} - {city.iataCode}</p>
                    </div>
                ))}
            </Slider>
        </div>
    )}
    <button className="search-button" onClick={() => handleSearch(arrivalKeyword, setArrivalResults)}>Cerca città di arrivo</button>
</div>
                </div>
            </div>

            {error && (
                <div className="error">
                    <p>{error}</p>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default CitySearch;
