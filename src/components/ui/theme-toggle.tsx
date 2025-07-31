"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    // Only toggle between light and dark
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  if (!mounted) {
    // Avoid hydration mismatch by rendering empty placeholder on server
    return <div className="w-12 h-7" aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 hover:bg-gray-400 dark:hover:bg-gray-500"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Toggle circle */}
      <div className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out ${
        isDark ? 'translate-x-6' : 'translate-x-1'
      }`}>
        {/* Icon inside the circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isDark ? (
            <Moon className="h-2.5 w-2.5 text-gray-400" />
          ) : (
            <Sun className="h-2.5 w-2.5 text-gray-600" />
          )}
        </div>
      </div>
    </button>
  );
}
