import { createTheme, virtualColor } from "@mantine/core";


const primaryDark = [
  "#020202", "#050505", "#070707", "#0A0A0A", "#0D0D0D",
  "#0F0F0F", "#121212", "#141414", "#171717", "#1A1A1A"
] as const;

const secondaryDark = [
  "#040404", "#080808", "#0D0D0D", "#111111", "#161616",
  "#1A1A1A", "#1E1E1E", "#232323", "#272727", "#2C2C2C"
] as const;

const primaryLight = [
  "#191919", "#323232", "#4C4C4C", "#656565", "#7F7F7F",
  "#999999", "#B2B2B2", "#CCCCCC", "#E5E5E5", "#FFFFFF"
] as const;

const secondaryLight = [
  "#181818", "#313131", "#4A4A4A", "#636363", "#7C7C7C",
  "#959595", "#AEAEAE", "#C7C7C7", "#E0E0E0", "#F9F9F9"
] as const;

// const primaryDark = [
//   "#666666", // L: ~50%
//   "#525252", // L: ~40%
//   "#3D3D3D", // L: ~30%
//   "#292929", // L: ~20%
//   "#1F1F1F", // L: ~15%
//   "#1A1A1A", // base, L: ~10%
//   "#141414", // L: ~8%
//   "#0F0F0F", // L: ~6%
//   "#0A0A0A", // L: ~4%
//   "#050505", // L: ~2%
// ] as const;

// const secondaryDark = [
//   "#7A7A7A", // L: ~57%
//   "#666666", // L: ~47%
//   "#525252", // L: ~37%
//   "#3D3D3D", // L: ~27%
//   "#333333", // L: ~22%
//   "#2C2C2C", // base, L: ~17%
//   "#222222", // L: ~14%
//   "#1A1A1A", // L: ~10%
//   "#121212", // L: ~7%
//   "#0A0A0A", // L: ~4%
// ] as const;

// const primaryLight = [
//   "#FFFFFF", // base, L: 100%
//   "#F9F9F9", // L: 98%
//   "#F4F4F4", // L: 96%
//   "#EFEFEF", // L: 94%
//   "#F2F2F2", // L: 80%
//   "#FFFFFF", // base, L: 92% (middle)
//   "#E6E6E6", // L: 70%
//   "#D9D9D9", // L: 60%
//   "#CCCCCC", // L: 50%
//   "#BFBFBF", // L: 40%
// ] as const;

// const secondaryLight = [
//   "#FFFFFF", // L: 100%
//   "#FBFBFB", // L: 98%
//   "#F7F7F7", // L: 96%
//   "#F3F3F3", // L: 94%
//   "#E6E6E6", // L: 80%
//   "#F9F9F9", // base, L: 92% (middle)
//   "#D9D9D9", // L: 70%
//   "#CCCCCC", // L: 60%
//   "#BFBFBF", // L: 50%
//   "#A6A6A6", // L: 40%
// ] as const;

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

// primaryDark: colorsTuple("#1A1A1A"),
// secondaryDark: colorsTuple("#2C2C2C"),

// primaryLight: colorsTuple("#000A10"),
// secondaryLight: colorsTuple("#000A10"),

// testLight: colorsTuple("#FF0000"),
// testDark: colorsTuple("#FF0000"),

// test: virtualColor({
//   name: "test",
//   dark: "testDark",
//   light: "testLight",
// }),

// primary: virtualColor({
//   name: "primary",
//   dark: "primaryDark",
//   light: "primaryLight",
// }),
// secondary: virtualColor({
//   name: "secondary",
//   light: "secondaryLight",
//   dark: "secondaryDark",
// }),

// // Old

// // darkPrimary: colorsTuple("#121212"),
// darkPrimary: colorsTuple("#000A10"),
// // darkSecondary: colorsTuple("#282828"),
// darkSecondary: colorsTuple("#181C21"),
// // lightPrimary: colorsTuple("#FFFBF5"),
// lightPrimary: colorsTuple("#FAF7F0"),
// // lightSecondary: colorsTuple("#FFFFFF"),
// lightSecondary: colorsTuple("#FFF"),
// lightText: colorsTuple("#F5F5F5"),
// darkText: colorsTuple("#181818"),
// altLightText: colorsTuple("#998A77"),
// altDarkText: colorsTuple("#6F89A5"),
// itemDark: colorsTuple("#333333"),
// itemLight: colorsTuple("#F8F4F0"),
// // borderDark: colorsTuple("#2A2A2A"),
// borderDark: colorsTuple("#23272B"),
// borderLight: colorsTuple("#EAE4DD"),
// buttonDark: colorsTuple("#000A10"),
// buttonLight: colorsTuple("#FAF7F0"),
// // primary: virtualColor({
// //   name: "primary",
// //   dark: "darkPrimary",
// //   light: "lightPrimary",
// // }),
// // secondary: virtualColor({
// //   name: "secondary",
// //   light: "lightSecondary",
// //   dark: "darkSecondary",
// // }),
// inverse: virtualColor({
//   name: "inverse",
//   light: "darkPrimary",
//   dark: "lightPrimary",
// }),
// text: virtualColor({
//   name: "text",
//   dark: "lightText",
//   light: "darkText",
// }),
// altText: virtualColor({
//   name: "altText",
//   dark: "altDarkText",
//   light: "altLightText",
// }),
// item: virtualColor({
//   name: "item",
//   dark: "itemDark",
//   light: "itemLight",
// }),
// border: virtualColor({
//   name: "item",
//   dark: "buttonDark",
//   light: "borderLight",
// }),
// btn: virtualColor({
//   name: "btn",
//   dark: "buttonDark",
//   light: "borderLight",
// }),
// },
