import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'https://backend-server-otcb.onrender.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''), // Removes /api prefix
            },
        },
    },
});
