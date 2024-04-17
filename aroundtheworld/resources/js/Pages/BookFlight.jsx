// BookFlight.jsx
import React, { useState } from 'react';
import CitySearch from './CitySearch';
import FlightSearchForm from './FlightSearchForm';

const BookFlight = ({ auth }) => {
    const [formDataFromCitySearch, setFormDataFromCitySearch] = useState({});

    const handleCitySearchData = (formData) => {
        setFormDataFromCitySearch(formData);
    };

    return (
        <div>
            <CitySearch auth={auth} onCitySearchData={handleCitySearchData} />
            <FlightSearchForm auth={auth} formDataFromCitySearch={formDataFromCitySearch} />
        </div>
    );
};

export default BookFlight;
