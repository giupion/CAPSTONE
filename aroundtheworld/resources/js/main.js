import React from 'react';
import { createRoot } from 'react-dom/client';
import { InertiaApp } from '@inertiajs/inertia-react';

// Crea il contenitore della tua applicazione
const container = document.getElementById('app');
const root = createRoot(container);

// Inizializza l'applicazione
root.render(
    <React.StrictMode>
        <InertiaApp
            initialPage={JSON.parse(container.dataset.page)}
            resolveComponent={(name) => import(`./Pages/${name}`).then((module) => module.default)}
        />
    </React.StrictMode>
);
