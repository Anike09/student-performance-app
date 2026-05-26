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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
