module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 35px 80px rgba(15, 23, 42, 0.08)',
        'soft-md': '0 20px 50px rgba(15, 23, 42, 0.06)',
      },
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#e6e9ff',
          500: '#5b21b6',
          600: '#4c1d95',
        },
        deepblue: '#1e3a8a',
        purple: '#7c3aed',
        accent: {
          cyan: '#06b6d4',
          mint: '#2dd4bf',
        },
      },
      borderRadius: {
        lg: '12px',
        xl: '20px',
      },
      transitionProperty: {
        'height-opacity': 'height, opacity',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
