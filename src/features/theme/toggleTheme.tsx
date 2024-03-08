import clsx from 'clsx'
import { useTheme } from 'entities/theme'
import Moon from 'shared/assets/icons/moon.svg?react'
import Sun from 'shared/assets/icons/sun.svg?react'
import { IconButton } from 'shared/ui/iconButton'

import './toggleTheme.scss'

export const ToggleTheme = () => {
    const { theme, toggleTheme } = useTheme()

    const Icon = theme === 'light' ? Sun : Moon

    return (
        <div className={clsx('toggle-theme', theme)} title='Change theme'>
            <IconButton
                Icon={Icon}
                onClick={toggleTheme}
                isCounterVisible={false}
                className='toggle-theme__icon'
            />
        </div>
    )
}
