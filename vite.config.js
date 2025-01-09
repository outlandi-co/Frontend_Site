import { defineConfig } from 'vite';

// This will ensure your VITE_API_URL and other variables are correctly read by Vite
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://backend-server-nlr5.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
