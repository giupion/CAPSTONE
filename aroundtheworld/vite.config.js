import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173, // Imposta la porta qui se necessario
    },
    resolve: {
        alias: {
            '@': '/resources/js', // Assicurati che questo sia corretto
        },
    },
    build: {
        rollupOptions: {
            input: 'aroundtheworld/index.html', // Cambia con il percorso corretto
        },
    },
});
