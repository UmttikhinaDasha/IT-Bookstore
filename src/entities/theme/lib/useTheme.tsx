import { useContext } from 'react'

import {
    LOCAL_STORAGE_THEME_KEY,
    Theme,
    ThemeContext,
} from '../config/themeContext'

interface UseThemeResults {
    /** Current theme. */
    readonly theme?: Theme
    /** Function to switch theme. */
    readonly toggleTheme: () => void
}

export const useTheme = (): UseThemeResults => {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
        setTheme?.(newTheme)
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }

    return { theme, toggleTheme }
}
