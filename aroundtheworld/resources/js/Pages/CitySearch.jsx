import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const CitySearch = ({ auth }) => { // Passa `auth` come props
    const [keyword, setKeyword] = useState('');
    const [cityResults, setCityResults] = useState([]);

    const handleChange = (e) => {
        setKeyword(e.target.value);
    };

    const searchCities = async () => {
        try {
            const response = await Inertia.get('/api/cities', {
                keyword: keyword
            });
            setCityResults(response.data.data);
        } catch (error) {
            console.error('Errore durante la ricerca delle città:', error);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}> {/* Usa `auth.user` */}
            <Head title="City Search" />

            <div className="form-container">
                <input type="text" value={keyword} onChange={handleChange} placeholder="Inserisci il nome della città o il codice IATA" />
                <button onClick={searchCities}>Cerca città</button>
                <ul>
                    {cityResults.map((city) => (
                        <li key={city.iataCode}>
                            {city.name} - {city.iataCode}
                        </li>
                    ))}
                </ul>
            </div>

            <style jsx>{`
                .form-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-top: 2rem;
                }
                input {
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    outline: none;
                    color: black;
                    background-color: rgba(0, 0, 0, 0.3);
                    width: 100%;
                    margin-bottom: 1rem;
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
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    width: 100%;
                }
                li {
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    margin-bottom: 0.5rem;
                    background-color: rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </AuthenticatedLayout>
    );
};

export default CitySearch;
