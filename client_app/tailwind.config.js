/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Cool modern blue-ish palette
                primary: {
                    DEFAULT: '#3b82f6',
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#f3f4f6',
                    foreground: '#1f2937',
                },
                card: {
                    DEFAULT: '#ffffff',
                    foreground: '#1f2937',
                },
                background: '#f9fafb',
                foreground: '#1f2937',
                muted: {
                    DEFAULT: '#f3f4f6',
                    foreground: '#6b7280',
                },
                accent: {
                    DEFAULT: '#eff6ff',
                    foreground: '#2563eb',
                },
                border: '#e5e7eb',
                input: '#e5e7eb',
                ring: '#3b82f6',
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in": "fade-in 0.3s ease-out",
                "fade-out": "fade-out 0.3s ease-out",
                "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
                "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "fade-in": {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                "fade-out": {
                    from: { opacity: "1" },
                    to: { opacity: "0" },
                },
                "slide-in-from-top": {
                    from: { transform: "translateY(-100%)" },
                    to: { transform: "translateY(0)" },
                },
                "slide-in-from-bottom": {
                    from: { transform: "translateY(100%)" },
                    to: { transform: "translateY(0)" },
                }
            },
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
        }
    },
    plugins: [],
}
