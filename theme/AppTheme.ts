import { Platform } from 'react-native';

const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const AppTheme = {
  dark: false,
  colors: {
    primary: 'rgb(93, 177, 51)',
    background: 'rgb(245, 245, 245)',
    card: 'rgb(207, 203, 203)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(52, 235, 143)',
    notification: 'rgb(255, 69, 58)',
  },
  fonts : Platform.select({
    web: {
      regular: {
        fontFamily: WEB_FONT_STACK,
        fontWeight: "400" as const,
      },
      medium: {
        fontFamily: WEB_FONT_STACK,
        fontWeight: "500" as const,
      },
      bold: {
        fontFamily: WEB_FONT_STACK,
        fontWeight: "600" as const,
      },
      heavy: {
        fontFamily: WEB_FONT_STACK,
        fontWeight: "700" as const,
      },
    },
    ios: {
      regular: {
        fontFamily: 'System',
        fontWeight: "400" as const,
      },
      medium: {
        fontFamily: 'System',
        fontWeight: "500" as const,
      },
      bold: {
        fontFamily: 'System',
        fontWeight: "600" as const,
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: "700" as const,
      },
    },
    default: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: "normal" as const,
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: "normal" as const,
      },
      bold: {
        fontFamily: 'sans-serif',
        fontWeight: "600" as const,
      },
      heavy: {
        fontFamily: 'sans-serif',
        fontWeight: "700" as const,
      },
    },
  }),
};