/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        interThin: ["inter_100Thin"],
        interExtraLight: ["inter_200ExtraLight"],
        interLight: ["inter_300Light"],
        interRegular: ["inter_400Regular"],
        interMedium: ["inter_500Medium"],
        interSemiBold: ["inter_600SemiBold"],
        interBold: ["inter_700Bold"],
        interExtraBold: ["inter_800ExtraBold"],
        interBlack: ["inter_900Black"],
      },
      colors: {
        primary: "#83c5f1",
        appBackground: "#FFFDFE",
        dark: "#333333",
        gray:"#9ca3af",
        offWhite:"#F5F7FA",
        warm:'#F4EDE4'
      },
    },
  },
  plugins: [],
};
