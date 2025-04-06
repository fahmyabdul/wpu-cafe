const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow:{
        // ref
        // drop-shadow(h-shadow v-shadow blur spread color)
        "neon-sky-blue": [
          "0 3px 7px rgb(34, 211, 238, 0.4)",
          "3px 0px 7px rgb(34, 211, 238, 0.4)",
          "-3px 0px 7px rgb(34, 211, 238, 0.4)",
        ],
        "neon-sky-blue-sm": [
          "0 3px 7px rgb(34, 211, 238, 0.3)",
          "3px 0px 7px rgb(34, 211, 238, 0.3)",
          "-3px 0px 7px rgb(34, 211, 238, 0.3)",
        ],
        "neon-teal": [
          "0 3px 7px rgb(0, 150, 137, 0.6)",
          "3px 0px 7px rgb(0, 150, 137, 0.6)",
          "-3px 0px 7px rgb(0, 150, 137, 0.6)",
        ],
        "neon-white": [
          "0 3px 6px rgb(255, 255, 255, 0.3)",
          "3px 0px 6px rgb(255, 255, 255, 0.3)",
          "-3px 0px 6px rgb(255, 255, 255, 0.3)",
        ],
        "neon-black": [
          "0 3px 5px rgb(0, 0, 0, 0.2)",
          "3px 0px 5px rgb(0, 0, 0, 0.2)",
          "-3px 0px 5px rgb(0, 0, 0, 0.2)",
        ],
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()]
}

