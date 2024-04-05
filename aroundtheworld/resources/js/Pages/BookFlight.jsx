import React, { useState } from 'react';
import axios from 'axios'; // Importa axios per effettuare richieste HTTP

const FlightSearchForm = () => {
    const [formData, setFormData] = useState({
        originLocationCode: '',
        destinationLocationCode: '',
        departureDate: '',
        adults: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/search', formData);
            console.log(response.data); // Fai qualcosa con la risposta
        } catch (error) {
            console.error('Errore durante la ricerca del volo:', error);
        }
    };

    return (
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
    );
};

export default FlightSearchForm;
