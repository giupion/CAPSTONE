import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    root: 'aroundtheworld', // Specifica la root corretta
    plugins: [react()],
    server: {
        port: 5173, // Imposta la porta qui se necessario
    },
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});
