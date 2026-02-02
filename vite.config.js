import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Basic Vite config for React
export default defineConfig({
  plugins: [react()],
  // Make sure we can import the CSV data properly
  assetsInclude: ['**/*.csv']
})
