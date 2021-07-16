module.exports = {
  // important: true,
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "theme-light": "#00b2dd",
        "theme-dark": "#007a96",
      },
      backgroundColor: {
        theme: "#f2f2f2",
        success: "#40BC69",
        "table-row": "#F7F7F7"
      },
      spacing: {
        "25p": "25%",
        "84": "21rem",
        "85": "21.25rem",
        "104": "26rem",
        "125": "31.25rem",
        "288": "72rem",

      },
    },
    container: {
      center: true,
      padding: "1rem",
      "margin-left": "auto",
      "margin-right": "auto",
    },
    minWidth: {
      "75": "18.75rem"
     }
  },
  variants: {
    extend: { opacity: ["active", "disabled"] },
  },
  plugins: [],
};
