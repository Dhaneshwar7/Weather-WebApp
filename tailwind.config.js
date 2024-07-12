/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			dropShadow: {
				'3xl': '0 10px 15px rgba(145, 144, 144, 0.25)',
				box: '12px 12px 8px #757575',
			},
			backgroundColor: {
				'd-col': '#444444',
				'l-col': '#ffffff',
			},
			backgroundImage: {
				'dark-lg':
					'linear-gradient(to right bottom, #191819, #212022, #2a292b, #323235, #3a3b3f, #3d3f42, #3f4246, #3d4042, #414446, #404344, #3f4141, #3e3f3f)',
				'light-lg':
					'linear-gradient(to right bottom, #fdfafd, #e9e6ef, #d1d3e2, #b5c2d5, #96b2c5, #93b2c3, #90b2c1, #8db2be, #a5c1cc, #bdd1da, #d4e1e8, #ebf1f5)',
			},
			transitionProperty: {
				'tr-bg': 'background-image',
				'left-right': 'left, right',
			},
			transitionDuration: {
				2000: '2000ms',
			},
			transitionDelay: {
				2000: '2000ms',
			},
		},
	},
	plugins: [],
};
