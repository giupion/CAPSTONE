import React, { useState, useEffect } from 'react';
import { Inertia, InertiaProvider } from '@inertiajs/inertia';
import CitySearch from './CitySearch';
import FlightSearchForm from './FlightSearchForm';

const BookFlight = ({ auth }) => {
  const [formDataFromCitySearch, setFormDataFromCitySearch] = useState({});

  useEffect(() => {
    Inertia.share({
      formDataFromCitySearch: formDataFromCitySearch
    });
  }, [formDataFromCitySearch]);

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

const BookFlightWithInertia = (props) => (
  <InertiaProvider>
    <BookFlight {...props} />
  </InertiaProvider>
);

export default BookFlightWithInertia;

