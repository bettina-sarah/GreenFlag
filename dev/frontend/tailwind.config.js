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
				
				'theme-emerald': 'rgba(0,178,151)',
				'theme-autumn': 'rgba(84,94,86)',
				'theme-orange': 'rgba(241,136,5)',
				'theme-electric': 'rgba(240, 29, 73)',
				'theme-blue': 'rgba(81,178,204)',
				'theme-green': 'rgba(63,179,77)',
				

				'custom-bg': 'rgba(var(--bg-color))',
				'base-text': 'rgba(var(--text-color))',
				'muted-text': 'rgba(var(--text-muted))',
				'inverted-text': 'rgba(var(--text-inverted))',
				'h1-custom': 'rgba(var(--custom-h1))',
				'h2-custom': 'rgba(var(--custom-h2))',
				'primary-color': 'rgba(var(--primary-color))',
				'secondary-color': 'rgba(var(--secondary-color))',
				'complementary-color': 'rgba(var(--optional-color))',

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
			'home-bg': "var(--bg-image-1)",
			'home-bg2': "var(--bg-image-2)",
		}
  	}
  },
  plugins: [
	require("tailwindcss-animate"),
	require("flowbite/plugin")
],
}

