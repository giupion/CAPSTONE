#N.B :Comando da inserire in console per generare access token di amadeus ed usare le api: php artisan access-token:generate


Ho sviluppato un'applicazione di un'agenzia di viaggi utilizzando Laravel per il backend e Inertia React per il frontend. 😊

Ho integrato tre API: Unsplash per le immagini, Pixabay per i video e Amadeus per la prenotazione dei voli, arricchendo così la visualizzazione delle destinazioni e offrendo funzionalità di prenotazione voli. Grazie al seeding dei dati nel database Laravel, le destinazioni sono sempre disponibili senza dover dipendere dalle API esterne, evitando così il rate limit e mantenendo il progetto gratuito. 📸🎥✈️

Nella dashboard, ogni giorno mostro una destinazione casuale, ottenuta tramite una richiesta API e memorizzata localmente con un cookie che scade dopo 24 ore. Questo crea un'esperienza dinamica per gli utenti senza dipendere costantemente dalle API esterne. 🗺️

Ho implementato anche una funzionalità di prenotazione voli utilizzando l'API di Amadeus, consentendo agli utenti di cercare città, selezionare voli e salvare le prenotazioni associate al proprio account. Ho incluso anche un comando Laravel per generare l'access token API di Amadeus, semplificando il processo di autenticazione. ✈️🛫

In futuro, ho in programma di implementare funzionalità aggiuntive come la verifica dell'email, il supporto multilingue e l'integrazione di altre API per il noleggio auto e gli hotel. L'obiettivo è migliorare l'esperienza complessiva dell'utente e rendere l'applicazione più completa e versatile. 🌐🏨🚗

Se vuoi dare un'occhiata al codice, puoi trovarlo nella mia repository su GitHub. 💻

Grazie per il vostro interesse! 😊



Grazie per il Vostro interesse!
I have developed a travel agency application using Laravel for the backend and Inertia React for the frontend. 😊

I integrated three APIs: Unsplash for images, Pixabay for videos, and Amadeus for flight booking, enriching the visualization of destinations and offering flight booking functionalities. Thanks to seeding data into the Laravel database, destinations are always available without relying on external APIs, thus avoiding rate limits and keeping the project free. 📸🎥✈️

In the dashboard, I display a random destination every day, obtained through an API request and locally stored with a cookie that expires after 24 hours. This creates a dynamic experience for users without constantly depending on external APIs. 🗺️

I also implemented a flight booking feature using the Amadeus API, allowing users to search cities, select flights, and save bookings associated with their account. I included a Laravel command to generate the Amadeus API access token, simplifying the authentication process. ✈️🛫

In the future, I plan to implement additional features such as email verification, multilingual support, and integration of other APIs for car rental and hotels. The goal is to enhance the overall user experience and make the application more comprehensive and versatile. 🌐🏨🚗

If you'd like to take a look at the code, you can find it in my repository on GitHub. 💻

Thank you for your interest! 😊

Comando da inserire in console per generare access token di amadeus ed usare le api: php artisan access-token:generate
