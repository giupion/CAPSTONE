import React, { useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const FlightSearchForm = ({ auth }) => {
    const [formData, setFormData] = useState({
        originLocationCode: '',
        destinationLocationCode: '',
        departureDate: '',
        adults: ''
    });
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/search', formData);
            setSearchResults(response.data.data); // Salva i risultati della ricerca
        } catch (error) {
            console.error('Errore durante la ricerca del volo:', error);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Flight Search" />

            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="originLocationCode" style={{ color: 'white' }}>Codice di partenza:</label>
                        <input type="text" id="originLocationCode" name="originLocationCode" value={formData.originLocationCode} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="destinationLocationCode" style={{ color: 'white' }}>Codice di destinazione:</label>
                        <input type="text" id="destinationLocationCode" name="destinationLocationCode" value={formData.destinationLocationCode} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="departureDate" style={{ color: 'white' }}>Data di partenza:</label>
                        <input type="date" id="departureDate" name="departureDate" value={formData.departureDate} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="adults" style={{ color: 'white' }}>Numero di adulti:</label>
                        <input type="number" id="adults" name="adults" value={formData.adults} onChange={handleChange} required />
                    </div>
                    <button type="submit">Cerca volo</button>
                </form>
                <div className="slider-container">
                    <Slider {...settings}>
                        {searchResults.map((flight) => (
                            <div key={flight.id} className="flight-card">
                                <h3 style={{ color: 'white' }}>Volo {flight.id}</h3>
                                <p style={{ color: 'white' }}>Durata: {flight.itineraries[0].duration}</p>
                                <p style={{ color: 'white' }}>Prezzo totale: {flight.price.total} {flight.price.currency}</p>
                                {/* Aggiungi altre informazioni del volo che desideri mostrare */}
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            <style jsx>{`
                .form-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .form-group {
                    margin-bottom: 1.5rem;
                }
                label {
                    margin-bottom: 0.5rem;
                }
                input {
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    outline: none;
                    color: black;
                    background-color: rgba(0, 0, 0, 0.3);
                    width: 100%;
                }
                button {
                    padding: 0.5rem 1rem;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    width: 100%;
                }
                .slider-container {
                    width: 80%;
                    margin-top: 2rem;
                }
                .flight-card {
                    width: 300px;
                    padding: 1rem;
                    margin: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                .flight-card h3 {
                    margin-bottom: 0.5rem;
                }
                .flight-card p {
                    margin-bottom: 0.5rem;
                }
            `}</style>
        </AuthenticatedLayout>
    );
};

export default FlightSearchForm;
