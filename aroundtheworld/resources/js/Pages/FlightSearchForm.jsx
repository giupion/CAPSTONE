// FlightSearchForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { InertiaLink } from '@inertiajs/inertia-react';

const FlightSearchForm = ({ auth, formDataFromCitySearch }) => {
    const [formData, setFormData] = useState({
        originLocationCode: formDataFromCitySearch?.originLocationCode || '',
        originLocationName: formDataFromCitySearch?.originLocationName || '',
        destinationLocationCode: formDataFromCitySearch?.destinationLocationCode || '',
        destinationLocationName: formDataFromCitySearch?.destinationLocationName || '',
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
            setSearchResults(response.data.data);
        } catch (error) {
            console.error('Errore durante la ricerca del volo:', error);
        }
    };

    const handleBookFlight = async (flight) => {
        try {
            if (!flight.price) {
                throw new Error('Il prezzo del volo non è definito');
            }
            const response = await axios.post('/api/book-flight', {
                flight_id: flight.id,
                carrier_code: flight.itineraries[0].segments[0].carrierCode,
                duration: flight.itineraries[0].duration,
                total_price: flight.price.total,
                booking_deadline: flight.lastTicketingDate,
                bookable_seats: flight.numberOfBookableSeats,
                instant_ticketing_required: flight.instantTicketingRequired,
                direct_flight: flight.oneWay,
                origin_city_name: formData.originLocationName,
            origin_city_code: formData.originLocationCode,
            destination_city_name: formData.destinationLocationName,
            destination_city_code: formData.destinationLocationCode
                // Aggiungi altri campi se necessario
            });
            console.log(response.data.message);
        } catch (error) {
            console.error('Errore durante la prenotazione del volo:', error);
        }
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Flight Search" />
            <div className="form-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <form onSubmit={handleSubmit} style={{ width: '50%', textAlign: 'center' }}>
                    <div className="form-group">
                        <label htmlFor="originLocationCode" style={{ color: 'white' }}>Città di partenza:</label>
                        <input type="text" id="originLocationCode" name="originLocationCode" value={`${formData.originLocationName} (${formData.originLocationCode})`} onChange={handleChange} required style={{ width: '100%' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="destinationLocationCode" style={{ color: 'white' }}>Città di destinazione:</label>
                        <input type="text" id="destinationLocationCode" name="destinationLocationCode" value={`${formData.destinationLocationName} (${formData.destinationLocationCode})`} onChange={handleChange} required style={{ width: '100%' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="departureDate" style={{ color: 'white' }}>Data di partenza:</label>
                        <input type="date" id="departureDate" name="departureDate" value={formData.departureDate} onChange={handleChange} required style={{ width: '100%' }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="adults" style={{ color: 'white' }}>Numero di adulti:</label>
                        <input type="number" id="adults" name="adults" value={formData.adults} onChange={handleChange} required style={{ width: '100%' }} />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            padding: '14px 20px',
                            margin: '8px 0',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        Cerca volo
                    </button>
                </form>
                <div className="slider-container">
                    <Slider {...settings}>
                        {searchResults.map((flight) => (
                            <div key={flight.id} className="flight-card">
                                <h3 style={{ color: 'white' }}>Volo {flight.id}</h3>
                                <p style={{ color: 'white' }}>Compagnia aerea: {flight.itineraries[0].segments[0].carrierCode}</p>
                                <p style={{ color: 'white' }}>Città di partenza: {formData.originLocationName} ({formData.originLocationCode})</p>
                                <p style={{ color: 'white' }}>Città di destinazione: {formData.destinationLocationName} ({formData.destinationLocationCode})</p>
                                <p style={{ color: 'white' }}>Durata: {flight.itineraries[0].duration}</p>
                                <p style={{ color: 'white' }}>Prezzo totale: {flight.price && flight.price.total} {flight.price && flight.price.currency}</p>
                                <p style={{ color: 'white' }}>Data ultima prenotazione: {flight.lastTicketingDate}</p>
                                <p style={{ color: 'white' }}>Posti prenotabili: {flight.numberOfBookableSeats}</p>
                                <p style={{ color: 'white' }}>Ticket immediato richiesto: {flight.instantTicketingRequired ? 'Sì' : 'No'}</p>
                                <p style={{ color: 'white' }}>Volo diretto: {flight.oneWay ? 'Sì' : 'No'}</p>
                                <button
                                    onClick={() => handleBookFlight(flight)}
                                    style={{
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        padding: '8px 16px',
                                        margin: '8px 0',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Prenota questo volo
                                </button>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <style jsx>{`
                .slider-container {
                    width: 80%; /* Modifica la larghezza del container del carousel secondo le tue preferenze */
                    margin: 20px auto; /* Centra il container orizzontalmente sulla pagina */
                }

                .flight-card {
                    background-color: #333; /* Cambia il colore di sfondo della card dei voli */
                    padding: 20px; /* Aggiunge spazio intorno al contenuto della card */
                    margin: 0 10px; /* Aggiunge margine tra le card dei voli */
                    border-radius: 5px; /* Aggiunge angoli arrotondati alla card */
                }

                .flight-card h3,
                .flight-card p {
                    margin: 5px 0; /* Aggiusta il margine tra i titoli e i paragrafi all'interno della card */
                }
            `}</style>
        </AuthenticatedLayout>
    );
};

export default FlightSearchForm;
