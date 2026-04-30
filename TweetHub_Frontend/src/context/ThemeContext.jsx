import { useState, useEffect } from 'react';
import { ThemeContext } from './themeContextValue';

function ThemeProviderComponent({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (!saved) return false;

        try {
            return JSON.parse(saved);
        } catch {
            localStorage.removeItem('theme');
            return false;
        }
    });

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(isDarkMode));

        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const value = {
        isDarkMode,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export const ThemeProvider = ThemeProviderComponent;
