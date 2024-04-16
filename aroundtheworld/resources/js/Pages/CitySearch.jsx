import React, { useState } from 'react';
import Axios from 'axios'; // Importa Axios
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const CitySearch = ({ auth }) => {
    const [keyword, setKeyword] = useState('');
    const [cityResults, setCityResults] = useState([]);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await Axios.get('/api/cities', {
                params: {
                    keyword: keyword
                }
            });
    
            if (response && response.data && response.data.data) {
                setCityResults(response.data.data);
            } else {
                setCityResults([]);
            }
        } catch (error) {
            setError('Errore durante la ricerca delle città.');
            console.error('Errore durante la ricerca delle città:', error);
        }
    };
    

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="City Search" />

            <div className="form-container">
                <input type="text" value={keyword} onChange={handleChange} placeholder="Inserisci il nome della città o il codice IATA" />
                <button onClick={handleSearch}>Cerca città</button>
            </div>

            {error && (
                <div className="error">
                    <p>{error}</p>
                </div>
            )}

            {cityResults.length > 0 && (
                <div className="city-results">
                    <h2>Risultati della ricerca</h2>
                    <ul>
                        {cityResults.map((city) => (
                            <li key={city.iataCode}>
                                {city.name} - {city.iataCode}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default CitySearch;
