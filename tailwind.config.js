export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: "#101114",
        cream: "#f6f1e9",
        mint: "#9de2d6",
        sun: "#f7d37a",
        coral: "#f3a394",
        slate: "#1f2937",
        haze: "#eef0f3"
      },
      fontFamily: {
        display: ["IBM Plex Sans", "ui-sans-serif", "system-ui"],
        body: ["IBM Plex Sans", "ui-sans-serif", "system-ui"]
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem"
      },
      boxShadow: {
        soft: "0 20px 40px rgba(16,17,20,0.08)"
      }
    }
  },
  plugins: []
};
