import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    // Aggiungi i plugin necessari
    plugins: [react()],

    // Configurazione del server
    server: {
        port: 5173, // Imposta la porta del server di sviluppo
    },

    // Risoluzione dei moduli
    resolve: {
        alias: {
            '@': '/resources/js', // Assicurati che questo alias punti alla cartella corretta
        },
    },

    // Opzioni di build
    build: {
        rollupOptions: {
            // Aggiungi qui moduli esterni se necessario
            external: [
                // 'some-external-module', // Decommenta e sostituisci con i tuoi moduli se necessario
            ],
        },
    },
});
