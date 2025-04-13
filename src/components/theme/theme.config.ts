import { createTheme, virtualColor } from "@mantine/core";

const primaryDark = [
  "#020202",
  "#050505",
  "#070707",
  "#0A0A0A",
  "#0D0D0D",
  "#0F0F0F",
  "#121212",
  "#141414",
  "#171717",
  "#1A1A1A",
] as const;

const secondaryDark = [
  "#040404",
  "#080808",
  "#0D0D0D",
  "#111111",
  "#161616",
  "#1A1A1A",
  "#1E1E1E",
  "#232323",
  "#272727",
  "#2C2C2C",
] as const;

const primaryLight = [
  "#191919",
  "#323232",
  "#4C4C4C",
  "#656565",
  "#7F7F7F",
  "#999999",
  "#B2B2B2",
  "#CCCCCC",
  "#E5E5E5",
  "#FFFFFF",
] as const;

const secondaryLight = [
  "#181818",
  "#313131",
  "#4A4A4A",
  "#636363",
  "#7C7C7C",
  "#959595",
  "#AEAEAE",
  "#C7C7C7",
  "#E0E0E0",
  "#EDEDED",
] as const;

const theme = createTheme({
  cursorType: "pointer",
  colors: {
    primaryLight,
    secondaryLight,
    primaryDark,
    secondaryDark,

    primary: virtualColor({
      name: "primary",
      light: "primaryLight",
      dark: "primaryDark",
    }),
    secondary: virtualColor({
      name: "secondary",
      light: "secondaryLight",
      dark: "secondaryDark",
    }),
    inverse: virtualColor({
      name: "inverse",
      light: "primaryDark",
      dark: "primaryLight",
    }),
  },
  fontFamily: "Poppins, sans-serif",
  components: {
    Text: {
      defaultProps: {
        color: "text",
      },
    },
  },
});

export default theme;
