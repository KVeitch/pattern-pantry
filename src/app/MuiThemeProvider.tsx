"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PatternsProvider } from "@/context/PatternsContext";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto), Roboto, sans-serif",
  },
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#546e7a",
      light: "#78909c",
      dark: "#37474f",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <PatternsProvider>{children}</PatternsProvider>
    </ThemeProvider>
  );
}
