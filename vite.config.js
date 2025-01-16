import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'https://backend-server-1wsz.onrender.com',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
