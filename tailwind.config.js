/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                // Stark balck and white palette
                background: '#ffffff',
                foreground: '#000000',

                // Accent colors from the reference (Lime/Yellowish)
                accent: {
                    DEFAULT: '#d9f99d', // Lime-200 ish
                    hover: '#bef264',   // Lime-300 ish
                    foreground: '#000000'
                },

                // Keeping primary for consistency but mapping to black/dark gray for this aesthetic
                primary: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                    950: '#000000', // Main dark
                },
            }
        },
    },
    plugins: [],
}
