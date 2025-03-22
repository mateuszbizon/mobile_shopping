/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
            colors: {
                dark: "var(--dark)",
                primary: "var(--primary)",
                red: "var(--red)",
                light: "var(--light)"
            }
        },
	},
	plugins: [],
}