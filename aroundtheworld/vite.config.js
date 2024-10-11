import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    plugins: [react()],
});
