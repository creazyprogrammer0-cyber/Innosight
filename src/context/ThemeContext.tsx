import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('innosight_theme') as ThemeMode;
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // Ignore fallback
    }
    return 'dark'; // Default to dark brand theme
  });

  useEffect(() => {
    try {
      localStorage.setItem('innosight_theme', theme);
    } catch (e) {
      console.warn('Unable to persist theme:', e);
    }

    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      document.body.style.backgroundColor = '#F7F8FC';
      document.body.style.color = '#11172A';
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      document.body.style.backgroundColor = '#080D18';
      document.body.style.color = '#F6F7FF';
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
