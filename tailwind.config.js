/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    fontSize: {
      xs: ".625rem",
      sm: ".75rem",
      md: ".875rem",
      lg: "1rem",
      xl: "1.5rem",
      "2xl": "2rem",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      spacing: {
        4.5: "1.125rem",
        8.5: "2.125rem",
      },
      fontFamily: {
        'Inter': ['"Inter"'],
      },
      colors: {
        btn: {
          "hover": "#606060",
          "hover-1": "#3A3A3A",

          "active": "#101010",
          "active-1": "#3A3A3A",

          "outline-default": "#32323219",
          "outline-active": "#3A3A3A66",
        },
        primary: {
          0: "rgb(var(--color-primary-0) / <alpha-value>)",
          100: "rgb(var(--color-primary-100) / <alpha-value>)",
          200: "rgb(var(--color-primary-200) / <alpha-value>)",
          300: "rgb(var(--color-primary-300) / <alpha-value>)",
          400: "rgb(var(--color-primary-400) / <alpha-value>)",
          700: "rgb(var(--color-primary-700) / <alpha-value>)",
          800: "rgb(var(--color-primary-800) / <alpha-value>)",
          900: "rgb(var(--color-primary-900) / <alpha-value>)",
        },
        warning: {
          100: "rgb(var(--color-warning-100) / <alpha-value>)",
          900: "rgb(var(--color-warning-900) / <alpha-value>)",
        },
        error: {
          100: "rgb(var(--color-error-100) / <alpha-value>)",
          900: "rgb(var(--color-error-900) / <alpha-value>)",
        },
        success: {
          100: "rgb(var(--color-success-100) / <alpha-value>)",
          900: "rgb(var(--color-success-900) / <alpha-value>)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
