import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api':{ //whenever the api endpoint address includes /api it will add below target to the front of it
        target:'http://localhost:3000',
        secure:false,
      },
    },
  },
  plugins: [react()],
})
