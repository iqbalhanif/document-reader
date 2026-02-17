/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'accessible-blue': '#0066CC',
                'accessible-green': '#00AA00',
            }
        },
    },
    plugins: [],
}
