import { colorsTuple, createTheme, virtualColor } from "@mantine/core";

const theme = createTheme({
  cursorType: "pointer",
  colors: {
    // darkPrimary: colorsTuple("#121212"),
    darkPrimary: colorsTuple("#000A10"),
    // darkSecondary: colorsTuple("#282828"),
    darkSecondary: colorsTuple("#181C21"),
    // lightPrimary: colorsTuple("#FFFBF5"),
    lightPrimary: colorsTuple("#FAF7F0"),
    // lightSecondary: colorsTuple("#FFFFFF"),
    lightSecondary: colorsTuple("#FFF"),
    lightText: colorsTuple("#F5F5F5"),
    darkText: colorsTuple("#181818"),
    altLightText: colorsTuple("#998A77"),
    altDarkText: colorsTuple("#6F89A5"),
    itemDark: colorsTuple("#333333"),
    itemLight: colorsTuple("#F8F4F0"),
    // borderDark: colorsTuple("#2A2A2A"),
    borderDark: colorsTuple("#23272B"),
    borderLight: colorsTuple("#EAE4DD"),
    buttonDark: colorsTuple("#FF0000"),
    buttonLight: colorsTuple("#FAF7F0"),
    primary: virtualColor({
      name: "primary",
      dark: "darkPrimary",
      light: "lightPrimary",
    }),
    secondary: virtualColor({
      name: "secondary",
      light: "lightSecondary",
      dark: "darkSecondary",
    }),
    inverse: virtualColor({
      name: "inverse",
      light: "darkPrimary",
      dark: "lightPrimary",
    }),
    text: virtualColor({
      name: "text",
      dark: "lightText",
      light: "darkText",
    }),
    altText: virtualColor({
      name: "altText",
      dark: "altDarkText",
      light: "altLightText",
    }),
    item: virtualColor({
      name: "item",
      dark: "itemDark",
      light: "itemLight",
    }),
    border: virtualColor({
      name: "item",
      dark: "buttonDark",
      light: "borderLight",
    }),
    btn: virtualColor({
      name: "item",
      dark: "buttonDark",
      light: "borderLight",
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
