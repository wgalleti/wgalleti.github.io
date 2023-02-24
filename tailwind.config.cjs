/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        table: "960px",
        desktop: "1248px",
      },
      colors: {
        white: "#ffffff",
        midnight: "#121063",
        metal: "#565584",
        purple: "#3f3cbb",
        blue: "#3ab7bf",
      },
      boxShadow: {
        sm: "0px 2px 4px 0px rgba(11, 10, 55, 0.15)",
        lg: "0px 8px 20px 0px rgba(18, 16, 99, 0.06)",
      },
      fontSize: {
        xs: ["14px", { lineHeight: "24px", letterSpacing: "-0.03em" }],
        sm: ["16px", { lineHeight: "28px", letterSpacing: "-0.03em" }],
        lg: ["18px", { lineHeight: "28px", letterSpacing: "-0.03em" }],
        xl: ["24px", { lineHeight: "36px", letterSpacing: "-0.03em" }],
        h4: ["36px", { lineHeight: "48px", letterSpacing: "-0.032em" }],
        h3: ["48px", { lineHeight: "56px", letterSpacing: "-0.032em" }],
        h2: ["56px", { lineHeight: "64px", letterSpacing: "-0.032em" }],
        h1: ["80px", { lineHeight: "80px", letterSpacing: "-0.032em" }],
      },
      fontFamily: {
        ubuntu: "Ubuntu",
        poppins: "Poppins",
      },
      backgroundImage: {
        space: "url(/images/bg-space.jpg)",
        wave: "url(/images/bg-wave.svg)",
        footer: "url(/images/bg-footer.svg)",
      },
    },
  },
  plugins: [],
};
