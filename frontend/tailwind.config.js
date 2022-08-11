module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "90rem",
      },
      height: {
        header: "60px",
        content: "calc(100vh - 61px)",
      },
      backgroundSize: {
        "20%": "20%",
      },
      backgroundPosition: {
        posloader: "-25% 0",
      },
      animation: {
        loader: "lineloader 1.2s ease-in-out infinite",
        "bounce-right": "bounce-right 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        lineloader: {
          "50%": { backgroundSize: "80%" },
          "100%": { backgroundPosition: "125% 0" },
        },
        "bounce-right": {
          "0%, 100%": {
            transform: "translateX(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
      opacity: ["disabled"],
      ringWidth: ["hover", "active", "disabled"],
      ringColor: ["hover", "active"],
      display: ["group-hover"],
      textColor: ["group-hover", "visited"],
      strokeColor: ["group-hover"],
    },
  },
  plugins: [],
  mode: 'jit',
};
