"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

type Theme = "light" | "dark" | "system";

const iconMap: Record<Theme, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const themeLabels = {
  light: "Light",
  dark: "Dark",
  system: "System",
} as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Ensure theme is typed as Theme
  const typedTheme = theme as Theme;

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    const themes: Theme[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(typedTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  }, [typedTheme, setTheme]);

  if (!mounted) {
    // Avoid hydration mismatch by rendering empty placeholder on server
    return <div className="w-10 h-10" aria-hidden="true" />;
  }

  // Safely index themeLabels using typedTheme
  const currentThemeLabel = themeLabels[typedTheme];
  const nextThemeIndex = (["light", "dark", "system"] as Theme[]).indexOf(typedTheme) + 1;
  const nextThemeLabel =
    themeLabels[(["light", "dark", "system"] as Theme[])[nextThemeIndex % 3]];

  // Select icon based on resolvedTheme, default to Monitor if unknown
  const ThemeIcon = iconMap[(resolvedTheme as Theme) ?? "system"];

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={`Toggle theme (current: ${currentThemeLabel}, next: ${nextThemeLabel})`}
      title={`Toggle theme (current: ${currentThemeLabel})`}
    >
      <ThemeIcon className="w-5 h-5" />
      <span className="sr-only">
        Toggle theme (current: {currentThemeLabel}, next: {nextThemeLabel})
      </span>
    </button>
  );
}
