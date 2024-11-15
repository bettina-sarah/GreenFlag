/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./src/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
	"./node_modules/flowbite/**/*.js"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
				'h1-yellow': '#EEE683',
				'h2-yellow' : '#BDDF7B',
				'hobby-green': '#4D8076',
				'greenflag-green': '#00B297',
				'hobby-green': '#4D8076',
				'h1-darkblue': '#2F4858',
				'button-light': '#CFFBE2',
				'button-dark': '#00B297',
				'theme-emerald': {
					light: '#CFFBE2',
					DEFAULT: '#00B297',
					dark: '#00B297',
				},
				'theme-autumn': {
					light:'#EAE1DF',
					DEFAULT:'#917C78',
					dark:'#667761',
				},
				'theme-orange': {
					light:'#BBB8B2',
					DEFAULT:'#BC5D2E',
					dark:'#2E2E3A',
				},
				'theme-blue': {
					light:'#5299D1',
					DEFAULT:'#71788C',
					dark:'#51B2CC */',
				},
				'theme-green': {
					light:'#A7D9C2',
					DEFAULT:'#8DCF96',
					dark:'#3FB34D',
				},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
		  fontFamily: {
			nunito: ['"Nunito"', 'sans-serif'],
			leckerli: ['Leckerli One', 'cursive'],
			inter: ['Inter','sans-serif']
		  },
		backgroundImage: {
			'home-bg': "url('/ressources/bg/Background.svg')",
			'home-bg2': "url('/ressources/bg/Background-2.svg')"

		}
  	}
  },
  plugins: [
	require("tailwindcss-animate"),
	require("flowbite/plugin")
],
}

