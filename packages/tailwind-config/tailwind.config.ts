import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      backgroundImage: {
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
    },
  },
  colors: {
    white: "#fff",
    black: "#000",
    transparent: "transparent",
    gray: {
      "50": "#f9fafb",
      "100": "#f4f5f7",
      "200": "#e5e7eb",
      "300": "#d2d6dc",
      "400": "#9fa6b2",
      "500": "#6b7280",
      "600": "#4b5563",
      "700": "#374151",
      "800": "#252f3f",
      "900": "#111111",
    },
    orange: {
      "50": "#fef8ee",
      "100": "#feefd6",
      "200": "#fcdcac",
      "300": "#f9c178",
      "400": "#f59d42",
      "500": "#f2801d",
      "600": "#e46612",
      "700": "#c45012",
      "800": "#963d16",
      "900": "#793515",
      "950": "#411809",
    },
    lemon: {
      "50": "#fdffe7",
      "100": "#f9ffc1",
      "200": "#f8ff86",
      "300": "#fbff41",
      "400": "#fff80d",
      "500": "#ffea00",
      "600": "#d1ae00",
      "700": "#a67d02",
      "800": "#89610a",
      "900": "#744f0f",
      "950": "#442a04",
    },
    red: {
      "50": "#fdf2f2",
      "100": "#fde8e8",
      "200": "#fbd5d5",
      "300": "#f8b4b4",
      "400": "#f98080",
      "500": "#f05252",
      "600": "#e02424",
      "700": "#c81e1e",
      "800": "#9b1c1c",
      "900": "#771d1d",
    },
    keyframes: {
      slideDownAndFade: {
        from: { opacity: "0", transform: "translateY(-2px)" },
        to: { opacity: "1", transform: "translateY(0)" },
      },
      slideLeftAndFade: {
        from: { opacity: "0", transform: "translateX(2px)" },
        to: { opacity: "1", transform: "translateX(0)" },
      },
      slideUpAndFade: {
        from: { opacity: "0", transform: "translateY(2px)" },
        to: { opacity: "1", transform: "translateY(0)" },
      },
      slideRightAndFade: {
        from: { opacity: "0", transform: "translateX(-2px)" },
        to: { opacity: "1", transform: "translateX(0)" },
      },
    },
    animation: {
      slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideLeftAndFade: "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideRightAndFade:
        "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },

  plugins: [],
};
export default config;
