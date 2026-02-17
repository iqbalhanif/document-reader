import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/document-reader/',
    optimizeDeps: {
        include: ['pdfjs-dist']
    }
})
