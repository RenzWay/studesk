"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemeProvider {...props} scriptProps={{ type: "application/json" }}>
      {children}
    </NextThemeProvider>
  );
}
