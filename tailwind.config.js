export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Updated colors based on the design image
        teal: {
          DEFAULT: '#005C5C', // Darker Teal/Green as seen in the image (Footer, Buttons)
          light: '#00AEAE', // Existing lighter teal for accents
          dark: '#004D40',
          darker: '#00352C',
        },
        orange: {
          DEFAULT: '#FFA726', // Vibrant Orange
          light: '#FFB74D',
          dark: '#F57C00',
          darker: '#E65100', 
        },
        gold: {
          DEFAULT: '#D4AF37',
        },
        gray: {
          light: '#F3F4F6',
          DEFAULT: '#9CA3AF',
          dark: '#374151',
          darker: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        'asymmetric': '0.5rem 1.5rem 1.5rem 0.5rem', // top-left top-right bottom-right bottom-left
      }
    },
  },
  plugins: [],
}