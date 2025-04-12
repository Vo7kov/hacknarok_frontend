import { MD3LightTheme as DefaultTheme, useTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    accent: "#0073D1",
  },
};

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();
