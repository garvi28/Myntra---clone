import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native-appearance';
import { colors } from '../constants/theme';

type ThemeContextType = {
    IsDark: boolean;
    toggleTheme: () => void;
    theme: typeof colors.light;
};
const ThemeContext = createContext<ThemeContextType | null>(null);
export const ThemeProvider = ({ children }: any) => {
const systemTheme = Appearance.getColorScheme();
const [IsDark, setIsDark] = useState(systemTheme === 'dark');
useEffect(() => {
    loadTheme();
}, []);
async function loadTheme() {
    const savedTheme = await AsyncStorage.getItem('theme');
    if (savedTheme) {
        setIsDark(savedTheme === 'dark');
    }
}
async function toggleTheme() {
    const newValue = !IsDark;
    setIsDark(newValue);
    await AsyncStorage.setItem('theme', newValue ? 'dark' : 'light');
}
return ( 
    <ThemeContext.Provider value={{ IsDark, toggleTheme, theme: IsDark ? colors.dark : colors.light }}>
        {children}
    </ThemeContext.Provider>
);
};
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};
