import { ColorMode, extendTheme } from "native-base";

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light'
};

export default extendTheme({
  colors: {
    primary: {
      50: "#FFF7ED",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12"
    },
    secondary: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#493d8a"
    },
    mute: "#62656b",
  },
  components: {
  },
  config
});
