/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: "#3F7E44",
				"primary-dark": "#2F5F33",
				"primary-light": "#EAF3EB",
				secondary: "#1F4F4A",
				background: "#F8FBF9",
			},
		},
	},
	plugins: [],
}
