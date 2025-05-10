"use client";

import { Provider as StateProvider } from "jotai";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StateProvider>
      <NextThemeProvider attribute="class">{children}</NextThemeProvider>
    </StateProvider>
  );
}
