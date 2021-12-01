const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            xs: "320px",
            ...defaultTheme.screens,
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};