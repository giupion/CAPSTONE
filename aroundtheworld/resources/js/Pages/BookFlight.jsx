import React, { useState } from 'react';
import axios from 'axios'; 

const FlightSearchForm = () => {
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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="originLocationCode">Codice di partenza:</label>
                    <input type="text" id="originLocationCode" name="originLocationCode" value={formData.originLocationCode} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="destinationLocationCode">Codice di destinazione:</label>
                    <input type="text" id="destinationLocationCode" name="destinationLocationCode" value={formData.destinationLocationCode} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="departureDate">Data di partenza:</label>
                    <input type="date" id="departureDate" name="departureDate" value={formData.departureDate} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="adults">Numero di adulti:</label>
                    <input type="number" id="adults" name="adults" value={formData.adults} onChange={handleChange} required />
                </div>
                <button type="submit">Cerca volo</button>
            </form>
            <div>
                {searchResults.map((flight) => (
                    <div key={flight.id} className="flight-card">
                        <h3>Volo {flight.id}</h3>
                        <p>Durata: {flight.itineraries[0].duration}</p>
                        <p>Prezzo totale: {flight.price.total} {flight.price.currency}</p>
                        {/* Aggiungi altre informazioni del volo che desideri mostrare */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlightSearchForm;
