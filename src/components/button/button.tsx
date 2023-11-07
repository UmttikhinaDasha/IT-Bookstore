import { FC } from 'react'
import clsx from 'clsx'

import './button.scss'

interface IButton {
    /** Button text. */
    readonly children: string
    /** Icon before text. */
    readonly Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    /** Button theme. */
    readonly theme?: 'blue' | 'transparent-grey' | 'transparent-blue'
    /** Button disable modifier. */
    readonly disabled?: boolean
    /** Additional styles. */
    readonly className?: string
}

export const Button: FC<IButton> = (props) => {
    const {
        children,
        Icon,
        theme = 'blue',
        disabled = false,
        className,
    } = props

    return (
        <button
            type='button'
            className={clsx(
                'button',
                `button_theme_${theme}`,
                disabled && 'button_disabled',
                className
            )}>
            {Icon && <Icon />}
            {children}
        </button>
    )
}
