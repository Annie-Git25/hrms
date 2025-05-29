import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/hrms', // Match your GitHub repo name
  plugins: [react()],
});

