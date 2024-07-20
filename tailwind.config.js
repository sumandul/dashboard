module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
      keyframes: {
        wave: {
          "0%": { transform: " translateY(-100%)" },
          "100%": {
            transform: " translateY(0%)",
          },
        },
      },
      animation: {
        notify: "wave 0.8s  ease-out",
      },
    },

    // Add custom  colors
    colors: {
      zapp: {
        primary: "var(--primary-color)",
        primary_Light: "#FFF8FB",
        overlay: "rgba(ff3b9d,0.3)",
        secondary: "var(--secandary-color)",
        default: "var(--default-color)",
        black: "#212427",
        primary_opacity: "var(--primary-color_opacity)",
        gray: "#fcfcfc",
        light_black: " #727272",
        white: "#ffffff",
        success: "#36D399",
        warning: "#DF2E38",
        gray_500: "#CFCFCF",
        info: "#3AB0FF",
        transparent: "transparent",
        overlay: " rgba(0, 0, 0,0.4) ",
      },
    },
    // Add custom font family
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },

    //  Add custom animation
    keyframes: {
      modalanimation: {
        "0%": { transform: "rotate(0deg)" },

        "100%": { transform: "rotate(360deg)" },
      },
    },
    animation: {
      modalanimation: "modalanimation 0.7s linear ",
    },
  },
  plugins: [],
};
