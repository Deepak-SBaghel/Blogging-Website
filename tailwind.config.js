/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "conf1": "rgb(248, 244, 225)",
        "conf2": "rgb(175, 143, 111)",
        "conf3": "rgb(116, 81, 45)",
        "conf4": "rgb(84, 51, 16)",
      },
    },
  },
  
  plugins: [],
};
