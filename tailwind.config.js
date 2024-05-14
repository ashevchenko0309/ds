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
        4.5: "18px",
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
          0: "#FFF",
          70: "rgba(255, 255, 255, 0.7)",
          100: "#F7F7F7",
          200: "#F0F0F0",
          300: "#CFD0D0",
          400: "#A0A0A2",
          700: "#323232",
          800: "#1A1A1A",
          900: "#141414",
          "900-40": "rgba(20, 20, 20, 0.4)",
        },
        warning: {
          100: "#FED68C",
          900: "#F2C571",
        },
        error: {
          100: "#EA6262",
          900: "#D53B3B",
        },
        success: {
          100: "#07D0B3",
          900: "#0AB59D",
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
