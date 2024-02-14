import { FC } from 'react'
import clsx from 'clsx'

import './dropdown.scss'

interface IDropdown {
    /** Element under which the dropdown will open. */
    readonly labelElement: JSX.Element
    /** Values for opening or closing a dropdown. */
    readonly isOpen?: boolean
    /** Dropdown content. */
    readonly content?: JSX.Element | JSX.Element[]
    /** If the dropdown has an arrow at the top. */
    readonly isArrow?: boolean
    /** Additional styles. */
    readonly className?: string
}

export const Dropdown: FC<IDropdown> = (props) => {
    const { labelElement, isOpen, content, isArrow = false, className } = props

    // If isOpen is defined, then the closing/opening classes are returned,
    // otherwise the dropdown will open on hover.
    let isOpenDropdown = isOpen ? 'dropdown_open' : 'dropdown_close'
    if (isOpen === undefined) {
        isOpenDropdown = 'dropdown_opening-state_hover'
    }

    return (
        <div
            className={clsx(
                'dropdown',
                isArrow && 'dropdown_with-arrow',
                isOpenDropdown,
                className
            )}>
            <div className='dropdown__label'>{labelElement}</div>
            <div className='dropdown__wrapper-content'>
                <div className='dropdown__content'>{content}</div>
            </div>
        </div>
    )
}
