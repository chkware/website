"use client";
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "chkwire-theme",
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    const stored = localStorage.getItem(storageKey) as Theme | null;
    return stored || defaultTheme;
  });
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Get system theme
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Apply theme class to document element
  const applyTheme = useCallback((themeToApply: Theme) => {
    if (typeof window === 'undefined') return 'light';
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    let themeClass: 'light' | 'dark';
    
    if (themeToApply === 'system') {
      themeClass = getSystemTheme();
    } else {
      themeClass = themeToApply;
    }
    
    root.classList.add(themeClass);
    return themeClass;
  }, [getSystemTheme]);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    
    // Apply the current theme
    const themeToApply = theme;
    const newResolvedTheme = applyTheme(themeToApply);
    setResolvedTheme(newResolvedTheme);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        const newTheme = applyTheme('system');
        setResolvedTheme(newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [applyTheme, theme]);

  // Update theme when it changes
  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem(storageKey, theme);
    const newResolvedTheme = applyTheme(theme);
    setResolvedTheme(newResolvedTheme);
  }, [theme, storageKey, applyTheme, mounted]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    resolvedTheme
  }), [theme, setTheme, resolvedTheme]);

  // Don't render until we've mounted on the client
  if (!mounted) {
    return null;
  }

  return (
    <ThemeProviderContext.Provider value={contextValue}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
