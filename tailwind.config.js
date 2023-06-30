/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"dark-blue": "#1E3C5C",
				"anti-flash-white": "#f0f0f0",
				silver: "c0c0c0",
				gold: {
					700: "#ffd700",
					900: "#ffbf00",
				},
			},
			fontFamily: {
				sans: "'Roboto', sans-serif",
				poppins: "'Poppins', sans-serif",
			},
		},
	},
	plugins: [],
};
