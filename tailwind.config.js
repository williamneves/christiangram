module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
      aspectRatio: {
        '4/3': '4 / 3',
        '3/4': '3 / 4',
      },
    }
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('tailwind-scrollbar'),
		require('tailwind-scrollbar-hide'),
	],
};