export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#000000", // Black Text
                secondary: "#4F46E5", // Vibrant Blue for Accents
                background: "#FFFFFF", // White Background
                cardBg: "#F8F9FA", // Light Gray for Cards
                textPrimary: "#1F2937", // Dark Gray for Text
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"], // Professional font
            },
        },
    },
    plugins: [],
};
